import { GAME_PHASES } from '../data/phasesData';

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
  phase_intro: false,
  phase_interlude1: false,
  phase_2_talk: false,
  phase_interlude2: false,
  phase_3_investigate: false,
  phase_3_talk: false,
  phase_interlude3: false,
  phase_4_investigate: false,
  phase_4_talk: false,
  phase_all_meeting: false,
  phase_deduction_vote: false,
  phase_ending: false,
};

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
      // Asynchronously send to server so all other player devices receive it immediately
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
// Multi-Device Cross-Sync Service (SSE + Polling)
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
 * Initializes real-time synchronization with the server so that GM's locks/unlocks
 * on any device are immediately reflected on all other devices (smartphones, PCs, tablets).
 */
export function initCrossDeviceSync(): () => void {
  if (typeof window === 'undefined') return () => {};
  if (isSyncInitialized) return () => {};
  isSyncInitialized = true;

  // 1. Initial REST fetch
  fetch('/api/game-state')
    .then((res) => {
      if (!res.ok) throw new Error('Server returned non-200');
      return res.json();
    })
    .then((data) => {
      if (data?.phaseVisibility) {
        applyRemoteState(data.phaseVisibility);
        window.dispatchEvent(new CustomEvent(SERVER_SYNC_STATUS_EVENT, { detail: { connected: true, mode: 'connected' } }));
      }
    })
    .catch((err) => {
      console.warn('[Sync] Server fetch note:', err.message);
    });

  // 2. Setup Server-Sent Events (SSE) for millisecond real-time push
  try {
    eventSource = new EventSource('/api/game-state/stream');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data?.phaseVisibility) {
          applyRemoteState(data.phaseVisibility);
          window.dispatchEvent(new CustomEvent(SERVER_SYNC_STATUS_EVENT, { detail: { connected: true, mode: 'realtime' } }));
        }
      } catch (e) {
        console.error('Error parsing SSE event data', e);
      }
    };

    eventSource.onerror = () => {
      // EventSource automatically retries; fall back to short polling if disconnected
      window.dispatchEvent(new CustomEvent(SERVER_SYNC_STATUS_EVENT, { detail: { connected: false, mode: 'reconnecting' } }));
    };
  } catch (err) {
    console.warn('[Sync] SSE not available, using periodic sync', err);
  }

  // 3. Periodic fallback poll every 3 seconds to guarantee sync even on mobile network interruptions
  pollTimer = window.setInterval(() => {
    fetch('/api/game-state')
      .then((res) => res.json())
      .then((data) => {
        if (data?.phaseVisibility) {
          applyRemoteState(data.phaseVisibility);
        }
      })
      .catch(() => {});
  }, 3000);

  return () => {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
    isSyncInitialized = false;
  };
}
