import mqtt, { MqttClient } from 'mqtt';
import { GAME_PHASES } from '../data/phasesData';
import {
  PhaseVisibilityMap,
  getStoredPhaseVisibility,
  savePhaseVisibility,
  SERVER_SYNC_STATUS_EVENT,
} from './phaseStorage';

const ROOM_STORAGE_KEY = 'boardbang_active_room_id';
export const DEFAULT_ROOM_ID = 'detective-zone-main';

export interface RoomSyncState {
  connected: boolean;
  roomId: string;
  isCustomRoom: boolean;
  lastSyncTime: number | null;
}

export const ROOM_STATUS_EVENT = 'boardbang_room_status_changed';

let client: MqttClient | null = null;
let currentRoomId: string = DEFAULT_ROOM_ID;
let isPublishingSelf = false;

/**
 * Determine the active room ID from URL query param (?room=xyz) or localStorage
 */
export function getActiveRoomId(): string {
  if (typeof window === 'undefined') return DEFAULT_ROOM_ID;
  try {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    if (roomParam && roomParam.trim()) {
      const clean = roomParam.trim();
      localStorage.setItem(ROOM_STORAGE_KEY, clean);
      return clean;
    }

    const stored = localStorage.getItem(ROOM_STORAGE_KEY);
    if (stored && stored.trim()) {
      return stored.trim();
    }
  } catch (e) {
    console.warn('Error getting active room ID:', e);
  }
  return DEFAULT_ROOM_ID;
}

/**
 * Set a new active room ID, update URL parameter, and re-subscribe
 */
export function setActiveRoomId(newRoomId: string): void {
  const clean = (newRoomId || DEFAULT_ROOM_ID).trim();
  currentRoomId = clean;
  try {
    localStorage.setItem(ROOM_STORAGE_KEY, clean);
    const url = new URL(window.location.href);
    if (clean === DEFAULT_ROOM_ID) {
      url.searchParams.delete('room');
    } else {
      url.searchParams.set('room', clean);
    }
    window.history.replaceState({}, '', url.toString());
  } catch (e) {
    console.warn('Error setting active room ID:', e);
  }

  // Re-subscribe to the new room topic
  if (client && client.connected) {
    resubscribeToRoom(clean);
  }

  notifyRoomStatus(client?.connected || false);
}

function getTopicForRoom(roomId: string): string {
  return `boardbang/v1/mystery_room/${encodeURIComponent(roomId)}/state`;
}

function notifyRoomStatus(connected: boolean) {
  if (typeof window === 'undefined') return;
  const detail: RoomSyncState = {
    connected,
    roomId: currentRoomId,
    isCustomRoom: currentRoomId !== DEFAULT_ROOM_ID,
    lastSyncTime: Date.now(),
  };

  window.dispatchEvent(new CustomEvent(ROOM_STATUS_EVENT, { detail }));
  window.dispatchEvent(
    new CustomEvent(SERVER_SYNC_STATUS_EVENT, {
      detail: { connected, mode: 'cloud_room', roomId: currentRoomId },
    })
  );
}

function resubscribeToRoom(roomId: string) {
  if (!client) return;
  const topic = getTopicForRoom(roomId);
  client.subscribe(topic, { qos: 1 }, (err) => {
    if (err) {
      console.warn('[MQTT] Subscribe error:', err);
    } else {
      console.log(`[MQTT] Subscribed to room topic: ${topic}`);
    }
  });
}

/**
 * Initialize high-speed cloud broker sync (EMQX Public WSS)
 * Completely bypasses any local proxy, 302 redirects, or container boundaries!
 */
export function initMqttCrossDeviceSync(): () => void {
  if (typeof window === 'undefined') return () => {};
  if (client) return () => {};

  currentRoomId = getActiveRoomId();

  // Primary WSS broker (EMQX Public Global WebSocket)
  const brokerUrl = 'wss://broker.emqx.io:8084/mqtt';
  const clientId = 'bb_user_' + Math.random().toString(36).substring(2, 9);

  try {
    client = mqtt.connect(brokerUrl, {
      clientId,
      clean: true,
      connectTimeout: 8000,
      reconnectPeriod: 3000,
      keepalive: 30,
    });

    client.on('connect', () => {
      console.log(`[MQTT] Connected to cloud broker as ${clientId}`);
      resubscribeToRoom(currentRoomId);
      notifyRoomStatus(true);

      // If we are GM and already have local state, publish retained state on connect
      const localState = getStoredPhaseVisibility();
      publishMqttPhaseVisibility(localState, false);
    });

    client.on('message', (topic, payload) => {
      if (isPublishingSelf) return;

      try {
        const raw = payload.toString('utf-8');
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.phaseVisibility === 'object') {
          const remoteMap = parsed.phaseVisibility;
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
            console.log('[MQTT] Remote state received and applied:', merged);
            // Save locally without re-broadcasting
            savePhaseVisibility(merged, false);
            notifyRoomStatus(true);
          }
        }
      } catch (e) {
        console.warn('[MQTT] Failed to parse incoming message:', e);
      }
    });

    client.on('close', () => {
      notifyRoomStatus(false);
    });

    client.on('error', (err) => {
      console.warn('[MQTT] Client error:', err);
      notifyRoomStatus(false);
    });
  } catch (err) {
    console.error('[MQTT] Connection initialization error:', err);
  }

  // Handle phone screen lock / tab resume
  const handleResume = () => {
    if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
      if (client && !client.connected) {
        client.reconnect();
      }
    }
  };

  window.addEventListener('visibilitychange', handleResume);
  window.addEventListener('focus', handleResume);

  return () => {
    window.removeEventListener('visibilitychange', handleResume);
    window.removeEventListener('focus', handleResume);
    if (client) {
      try {
        client.end(true);
      } catch {}
      client = null;
    }
  };
}

/**
 * Broadcast phase visibility update to cloud broker with retained: true
 * Retained: true guarantees any mobile phone connecting later receives it immediately!
 */
export function publishMqttPhaseVisibility(map: PhaseVisibilityMap, force: boolean = true): void {
  if (!client || !client.connected) return;

  const topic = getTopicForRoom(currentRoomId);
  const payload = JSON.stringify({
    phaseVisibility: map,
    timestamp: Date.now(),
    roomId: currentRoomId,
  });

  isPublishingSelf = true;
  client.publish(topic, payload, { qos: 1, retain: true }, (err) => {
    isPublishingSelf = false;
    if (err) {
      console.warn('[MQTT] Failed to publish phase visibility:', err);
    } else {
      console.log(`[MQTT] Published state to ${topic} (retained: true)`);
    }
  });
}

/**
 * Helper to get a shareable link for detectives with the room code
 */
export function getRoomShareLink(roomId?: string): string {
  if (typeof window === 'undefined') return '';
  const r = roomId || currentRoomId;
  const url = new URL(window.location.href);
  if (r === DEFAULT_ROOM_ID) {
    url.searchParams.delete('room');
  } else {
    url.searchParams.set('room', r);
  }
  return url.toString();
}
