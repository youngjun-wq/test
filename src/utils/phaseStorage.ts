import { GAME_PHASES } from '../data/phasesData';
import { publishMqttPhaseVisibility, initMqttCrossDeviceSync } from './mqttSync';

export type PhaseVisibilityMap = Record<string, boolean>;

const STORAGE_KEY = 'boardbang_phase_visibility_v1';
export const PHASE_VISIBILITY_EVENT = 'boardbang_phase_visibility_change';
export const SERVER_SYNC_STATUS_EVENT = 'boardbang_server_sync_status';

/**
 * Initial default unlocked phases:
 * Only Opening (phase 0) and Travel (phase 1) are unlocked by default
 * so players cannot read ahead or spoil later phases.
 */
export const DEFAULT_UNLOCKED_PHASES: PhaseVisibilityMap = {
  phase_0_opening: true,
  phase_1_travel: true,
  phase_2_intro: false,
  phase_3_interlude1: false,
  phase_4_talk2: false,
  phase_5_interlude2: false,
  phase_6_investigate3: false,
  phase_7_talk3: false,
  phase_8_interlude3: false,
  phase_9_investigate4: false,
  phase_10_talk4: false,
  phase_11_council: false,
  phase_12_deduction: false,
  phase_13_ending: false,
};

/**
 * Checks if 4장 조사 페이즈 (phase_9_investigate4) is currently unlocked/open
 */
export function isPhase4InvestigateUnlocked(): boolean {
  const map = getStoredPhaseVisibility();
  return !!(map['phase_9_investigate4'] || map['phase_4_investigate']);
}

/**
 * Load phase visibility state from localStorage with fallback
 */
export function getStoredPhaseVisibility(): PhaseVisibilityMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_UNLOCKED_PHASES };
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return { ...DEFAULT_UNLOCKED_PHASES };
    
    // Ensure all phase keys exist
    const result: PhaseVisibilityMap = { ...DEFAULT_UNLOCKED_PHASES };
    GAME_PHASES.forEach((p) => {
      if (typeof parsed[p.id] === 'boolean') {
        result[p.id] = parsed[p.id];
      }
    });
    // Phase 0 should always be true so opening can always be read
    result['phase_0_opening'] = true;
    return result;
  } catch {
    return { ...DEFAULT_UNLOCKED_PHASES };
  }
}

/**
 * Save phase visibility state to localStorage, trigger local event,
 * and push to backend server for instant multi-device sync
 */
export function savePhaseVisibility(map: PhaseVisibilityMap, broadcastToServer: boolean = true): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent(PHASE_VISIBILITY_EVENT, { detail: map }));

    if (broadcastToServer) {
      // 1. High-speed Cloud Broker Broadcast (bypasses container/proxy cookies)
      try {
        publishMqttPhaseVisibility(map);
      } catch (e) {
        console.warn('MQTT broadcast failed:', e);
      }

      // 2. Asynchronously send to server backup
      fetch('/api/game-state/phase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phaseVisibility: map }),
      }).catch((err) => {
        console.warn('Failed to broadcast phase lock to server:', err);
      });
    }
  } catch (err) {
    console.error('Failed to save phase visibility', err);
  }
}

/**
 * Unlock all phases up to and including the specified phase index
 */
export function unlockUpToPhaseIndex(index: number): PhaseVisibilityMap {
  const current = getStoredPhaseVisibility();
  const next: PhaseVisibilityMap = { ...current };

  GAME_PHASES.forEach((p, idx) => {
    if (idx <= index) {
      next[p.id] = true;
    }
  });

  savePhaseVisibility(next, true);
  return next;
}

/**
 * Unlock all 14 phases
 */
export function unlockAllPhases(): PhaseVisibilityMap {
  const next: PhaseVisibilityMap = {};
  GAME_PHASES.forEach((p) => {
    next[p.id] = true;
  });
  savePhaseVisibility(next, true);
  return next;
}

/**
 * Reset back to opening + travel only
 */
export function resetPhaseVisibility(): PhaseVisibilityMap {
  const next = { ...DEFAULT_UNLOCKED_PHASES };
  savePhaseVisibility(next, true);

  fetch('/api/game-state/reset', { method: 'POST' }).catch(() => {});
  return next;
}

/**
 * Toggle a single phase unlock status
 */
export function togglePhaseUnlocked(phaseId: string, unlocked?: boolean): PhaseVisibilityMap {
  const current = getStoredPhaseVisibility();
  const nextState = unlocked !== undefined ? unlocked : !current[phaseId];
  
  // Do not allow locking phase 0 (Opening phase)
  if (phaseId === 'phase_0_opening') {
    return current;
  }

  const next: PhaseVisibilityMap = {
    ...current,
    [phaseId]: nextState,
  };

  savePhaseVisibility(next, true);
  return next;
}

// ==========================================
// Multi-Device Cross-Sync Service (SSE + Polling + Mobile Resume)
// ==========================================

let isSyncInitialized = false;
let eventSource: EventSource | null = null;
let pollTimer: number | null = null;

function applyRemoteState(remoteMap: Record<string, boolean>) {
  if (!remoteMap || typeof remoteMap !== 'object') return;
  const current = getStoredPhaseVisibility();

  let hasDiff = false;
  const merged: PhaseVisibilityMap = { ...current };

  GAME_PHASES.forEach((p) => {
    if (typeof remoteMap[p.id] === 'boolean' && remoteMap[p.id] !== current[p.id]) {
      merged[p.id] = remoteMap[p.id];
      hasDiff = true;
    }
  });

  if (hasDiff) {
    // Save locally without re-broadcasting to avoid infinite ping-pong loops
    savePhaseVisibility(merged, false);
  }
}

/**
 * Fetch latest game state from server with cache busting and credentials
 */
export async function fetchLatestState(): Promise<boolean> {
  try {
    const res = await fetch(`/api/game-state?t=${Date.now()}`, {
      credentials: 'include',
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

    if (!res.ok) return false;
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) return false;

    const data = await res.json();
    if (data?.phaseVisibility) {
      applyRemoteState(data.phaseVisibility);
      window.dispatchEvent(
        new CustomEvent(SERVER_SYNC_STATUS_EVENT, { detail: { connected: true, mode: 'connected' } })
      );
      return true;
    }
    return false;
  } catch (err) {
    console.warn('[Sync] Fetch note:', err);
    return false;
  }
}

/**
 * Initializes real-time synchronization with the server so that GM's locks/unlocks
 * on any device are immediately reflected on all other devices (smartphones, PCs, tablets).
 */
export function initCrossDeviceSync(): () => void {
  if (typeof window === 'undefined') return () => {};
  if (isSyncInitialized) return () => {};
  isSyncInitialized = true;

  // 0. Cloud Broker Sync (EMQX Public WSS) - 100% reliable cross-device & mobile sync
  const cleanupMqtt = initMqttCrossDeviceSync();

  // 1. Initial REST fetch
  fetchLatestState();

  // 2. Setup Server-Sent Events (SSE) with auto-reconnect
  const setupSSE = () => {
    if (eventSource) {
      try { eventSource.close(); } catch {}
      eventSource = null;
    }

    try {
      eventSource = new EventSource('/api/game-state/stream', { withCredentials: true });

      eventSource.onopen = () => {
        window.dispatchEvent(
          new CustomEvent(SERVER_SYNC_STATUS_EVENT, { detail: { connected: true, mode: 'realtime' } })
        );
      };

      eventSource.onmessage = (event) => {
        try {
          // Ignore comments/pings
          if (!event.data || event.data.startsWith(':')) return;
          const data = JSON.parse(event.data);
          if (data?.phaseVisibility) {
            applyRemoteState(data.phaseVisibility);
            window.dispatchEvent(
              new CustomEvent(SERVER_SYNC_STATUS_EVENT, { detail: { connected: true, mode: 'realtime' } })
            );
          }
        } catch (e) {
          console.error('Error parsing SSE event data', e);
        }
      };

      eventSource.onerror = () => {
        window.dispatchEvent(
          new CustomEvent(SERVER_SYNC_STATUS_EVENT, { detail: { connected: false, mode: 'reconnecting' } })
        );
      };
    } catch (err) {
      console.warn('[Sync] SSE setup warning:', err);
    }
  };

  setupSSE();

  // 3. Periodic fallback poll every 2.5 seconds to guarantee sync even on mobile network drops
  pollTimer = window.setInterval(() => {
    fetchLatestState();
  }, 2500);

  // 4. Mobile screen unlock / tab focus detection
  // Mobile browsers freeze background tabs; when user views tab again, immediately sync!
  const handleVisibilityOrFocus = () => {
    if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
      fetchLatestState();
      if (!eventSource || eventSource.readyState === EventSource.CLOSED) {
        setupSSE();
      }
    }
  };

  window.addEventListener('visibilitychange', handleVisibilityOrFocus);
  window.addEventListener('focus', handleVisibilityOrFocus);

  return () => {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
    window.removeEventListener('visibilitychange', handleVisibilityOrFocus);
    window.removeEventListener('focus', handleVisibilityOrFocus);
    if (cleanupMqtt) {
      try { cleanupMqtt(); } catch {}
    }
    isSyncInitialized = false;
  };
}
