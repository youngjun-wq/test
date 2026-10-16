import { GAME_PHASES } from '../data/phasesData';

export type PhaseVisibilityMap = Record<string, boolean>;

const STORAGE_KEY = 'boardbang_phase_visibility_v1';
export const PHASE_VISIBILITY_EVENT = 'boardbang_phase_visibility_change';

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
 * Save phase visibility state to localStorage and trigger change notification
 */
export function savePhaseVisibility(map: PhaseVisibilityMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent(PHASE_VISIBILITY_EVENT, { detail: map }));
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

  savePhaseVisibility(next);
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
  savePhaseVisibility(next);
  return next;
}

/**
 * Reset back to opening + travel only
 */
export function resetPhaseVisibility(): PhaseVisibilityMap {
  const next = { ...DEFAULT_UNLOCKED_PHASES };
  savePhaseVisibility(next);
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

  savePhaseVisibility(next);
  return next;
}
