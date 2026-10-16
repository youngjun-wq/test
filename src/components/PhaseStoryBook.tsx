import React, { useState, useEffect } from 'react';
import { GAME_PHASES } from '../data/phasesData';
import { GamePhaseStory } from '../types/scenario';
import {
  playPageFlipSound,
  playGramophoneSound,
  playWatchTick,
  playStampSlamSound,
  playBrassChime,
} from '../utils/sound';
import {
  PhaseVisibilityMap,
  getStoredPhaseVisibility,
  togglePhaseUnlocked,
  unlockUpToPhaseIndex,
  unlockAllPhases,
  resetPhaseVisibility,
  PHASE_VISIBILITY_EVENT,
} from '../utils/phaseStorage';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Volume2,
  Clock,
  AlertTriangle,
  Users,
  Compass,
  ShieldAlert,
  Sparkles,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  RotateCcw,
  CheckCircle2,
  Sliders,
  ShieldCheck,
} from 'lucide-react';

interface PhaseStoryBookProps {
  currentPhaseIndex: number;
  onSelectPhase?: (index: number) => void;
  isGm?: boolean;
}

export const PhaseStoryBook: React.FC<PhaseStoryBookProps> = ({
  currentPhaseIndex,
  onSelectPhase,
  isGm = false,
}) => {
  const [activeTab, setActiveTab] = useState<number>(currentPhaseIndex || 0);
  const [isPlayingGramophone, setIsPlayingGramophone] = useState(false);
  const [visibilityMap, setVisibilityMap] = useState<PhaseVisibilityMap>(() =>
    getStoredPhaseVisibility()
  );
  const [showGmControlPanel, setShowGmControlPanel] = useState<boolean>(true);

  // Sync activeTab when parent changes currentPhaseIndex
  useEffect(() => {
    if (typeof currentPhaseIndex === 'number' && currentPhaseIndex !== activeTab) {
      setActiveTab(currentPhaseIndex);
    }
  }, [currentPhaseIndex]);

  // Listen for storage changes across tabs and custom events
  useEffect(() => {
    const handleUpdate = () => {
      setVisibilityMap(getStoredPhaseVisibility());
    };

    window.addEventListener(PHASE_VISIBILITY_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(PHASE_VISIBILITY_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const phase: GamePhaseStory = GAME_PHASES[activeTab] || GAME_PHASES[0];
  const isPhaseUnlocked = visibilityMap[phase.id] !== false; // default true if undefined

  // Find the highest unlocked phase for players to quickly navigate to
  const highestUnlockedIndex = GAME_PHASES.reduce((acc, p, idx) => {
    if (visibilityMap[p.id] !== false) return idx;
    return acc;
  }, 0);

  const unlockedCount = GAME_PHASES.filter((p) => visibilityMap[p.id] !== false).length;

  // Handlers for switching phase
  const handleNext = () => {
    if (activeTab < GAME_PHASES.length - 1) {
      const nextIndex = activeTab + 1;
      const nextPhaseId = GAME_PHASES[nextIndex].id;
      // If player and next phase is locked, warn them or still allow seeing the lock screen
      setActiveTab(nextIndex);
      onSelectPhase?.(nextIndex);
      playPageFlipSound();
    }
  };

  const handlePrev = () => {
    if (activeTab > 0) {
      const prevIndex = activeTab - 1;
      setActiveTab(prevIndex);
      onSelectPhase?.(prevIndex);
      playPageFlipSound();
    }
  };

  const handleSelect = (idx: number) => {
    setActiveTab(idx);
    onSelectPhase?.(idx);
    playWatchTick('tick');
  };

  const triggerGramophone = () => {
    setIsPlayingGramophone(true);
    playGramophoneSound();
    setTimeout(() => setIsPlayingGramophone(false), 2000);
  };

  // GM ON/OFF handlers
  const handleToggleCurrentPhase = (phaseId: string) => {
    const updated = togglePhaseUnlocked(phaseId);
    setVisibilityMap(updated);
    playStampSlamSound();
  };

  const handleUnlockUpToCurrent = () => {
    const updated = unlockUpToPhaseIndex(activeTab);
    setVisibilityMap(updated);
    playBrassChime();
  };

  const handleUnlockAll = () => {
    const updated = unlockAllPhases();
    setVisibilityMap(updated);
    playBrassChime();
  };

  const handleResetVisibility = () => {
    if (confirm('오프닝과 1장 이동 단계만 남기고 이후 모든 단계를 다시 잠그시겠습니까?')) {
      const updated = resetPhaseVisibility();
      setVisibilityMap(updated);
      playStampSlamSound();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* =========================================================
          GM DEDICATED PHASE ON/OFF CONTROL PANEL (isGm === true)
         ========================================================= */}
      {isGm && (
        <div className="bg-[#1c1410] border-2 border-[#b48c36] p-4 rounded-sm shadow-xl space-y-3 font-serif">
          {/* Header of GM Control Panel */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#b48c36]/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xs bg-[#8b261e] border border-[#d4af37] flex items-center justify-center text-[#f5ede1]">
                <Sliders className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-[#f5ede1] font-title">
                    GM 단계별 탐정 공개(ON/OFF) 제어실
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-xs border font-mono font-bold bg-[#120e0b] border-[#d4af37]/50 text-[#d4af37]">
                    탐정 공개: {unlockedCount} / {GAME_PHASES.length}개
                  </span>
                </div>
                <p className="text-xs text-[#a89988]">
                  스포일러를 방지하기 위해 탐정들이 읽을 수 있는 단계를 직접 ON/OFF 하십시오.
                </p>
              </div>
            </div>

            {/* Quick Batch Actions */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={handleUnlockUpToCurrent}
                className="px-2.5 py-1.5 bg-[#8b261e] hover:bg-[#a52a22] text-[#f5ede1] border border-[#d4af37] font-bold rounded-xs flex items-center gap-1 cursor-pointer transition-transform active:scale-95 shadow-sm"
                title={`현재 보고 있는 ${phase.numberTitle}까지 모두 탐정에게 공개`}
              >
                <Unlock className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>현재 단계까지 일괄 해금</span>
              </button>

              <button
                type="button"
                onClick={handleUnlockAll}
                className="px-2.5 py-1.5 bg-[#251e18] hover:bg-[#342a22] text-[#d4af37] border border-[#b48c36]/60 font-semibold rounded-xs flex items-center gap-1 cursor-pointer transition-colors"
                title="전체 14개 단계 모두 공개"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>전체 공개</span>
              </button>

              <button
                type="button"
                onClick={handleResetVisibility}
                className="px-2.5 py-1.5 bg-[#17120e] hover:bg-[#231b15] text-[#a89988] hover:text-[#f5ede1] border border-[#44362b] rounded-xs flex items-center gap-1 cursor-pointer transition-colors"
                title="오프닝 제외 모두 잠금"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>초기화</span>
              </button>
            </div>
          </div>

          {/* Current Selected Phase Toggle Callout */}
          <div className="p-3 bg-[#241a15] border border-[#b48c36]/40 rounded-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#a89988]">현재 선택된 단계:</span>
              <span className="text-xs sm:text-sm font-bold text-[#f5ede1]">
                {phase.numberTitle} - {phase.name}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleToggleCurrentPhase(phase.id)}
              disabled={phase.id === 'phase_0_opening'}
              className={`px-3.5 py-1.5 rounded-xs border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm ${
                phase.id === 'phase_0_opening'
                  ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300 opacity-80 cursor-not-allowed'
                  : isPhaseUnlocked
                  ? 'bg-emerald-900/60 hover:bg-emerald-800/80 border-emerald-500 text-emerald-200'
                  : 'bg-red-950/60 hover:bg-red-900/80 border-red-500 text-red-200'
              }`}
            >
              {isPhaseUnlocked ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>탐정 화면에 공개 중 (ON)</span>
                  <span className="text-[10px] text-emerald-300/80 underline ml-1">
                    [클릭 시 잠금]
                  </span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-red-400" />
                  <span>탐정 화면에서 비공개/잠금 (OFF)</span>
                  <span className="text-[10px] text-red-300/80 underline ml-1">
                    [클릭 시 공개]
                  </span>
                </>
              )}
            </button>
          </div>

          {/* 14 Phases Quick ON/OFF Grid */}
          <div className="pt-1">
            <div className="text-[11px] text-[#a89988] mb-1.5 flex items-center justify-between">
              <span>단계별 공개 상태 (클릭하여 개별 ON / OFF 토글):</span>
              <span className="text-[10px] text-[#b48c36]">
                🟢 공개됨 &nbsp;·&nbsp; 🔒 비공개(잠김)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5 text-[11px]">
              {GAME_PHASES.map((p, idx) => {
                const isUnlocked = visibilityMap[p.id] !== false;
                const isCurrent = idx === activeTab;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      if (p.id !== 'phase_0_opening') {
                        handleToggleCurrentPhase(p.id);
                      }
                      setActiveTab(idx);
                      onSelectPhase?.(idx);
                    }}
                    className={`p-1.5 rounded-xs border text-left transition-all cursor-pointer flex flex-col justify-between h-[52px] ${
                      isCurrent
                        ? 'ring-2 ring-[#d4af37] border-[#d4af37] bg-[#2e2219]'
                        : 'bg-[#15100d] hover:bg-[#201813]'
                    } ${
                      isUnlocked
                        ? 'border-emerald-600/70 text-[#f5ede1]'
                        : 'border-red-900/60 text-[#8c7e73]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-[10px] text-[#a89988]">
                        #{idx}
                      </span>
                      {isUnlocked ? (
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                          <Eye className="w-2.5 h-2.5" />
                          <span>ON</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-red-400 flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" />
                          <span>OFF</span>
                        </span>
                      )}
                    </div>
                    <span className="font-serif truncate text-[11px] font-medium">
                      {p.numberTitle.split('(')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          PHASE NAVIGATION BAR (14 PHASES PILLS)
         ========================================================= */}
      <div className="bg-[#1f1a16] border border-[#b48c36]/40 p-3 rounded-t-sm shadow-md">
        <div className="flex items-center justify-between gap-2 mb-2 text-[#e5d5be]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#d4af37]" />
            <span className="font-serif font-bold text-xs sm:text-sm tracking-wider">
              진행 순서 및 단계별 이야기 (총 14단계)
            </span>
          </div>
          <div className="flex items-center gap-2">
            {!isGm && (
              <span className="text-[11px] text-[#a89988] hidden sm:inline">
                (자물쇠 🔒 표시는 아직 GM이 공개하지 않은 단계입니다)
              </span>
            )}
            <span className="text-xs text-[#d4af37] font-mono bg-[#120e0b] px-2 py-0.5 border border-[#b48c36]/30">
              {activeTab + 1} / {GAME_PHASES.length}
            </span>
          </div>
        </div>

        {/* Horizontal scrollable pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-[#b48c36]/50">
          {GAME_PHASES.map((p, idx) => {
            const isActive = idx === activeTab;
            const isUnlocked = visibilityMap[p.id] !== false;

            return (
              <button
                key={p.id}
                onClick={() => handleSelect(idx)}
                className={`shrink-0 px-2.5 py-1 text-xs font-serif transition-all duration-200 border flex items-center gap-1 cursor-pointer ${
                  isActive
                    ? 'bg-[#9b2226] text-[#faf6ee] border-[#d4af37] shadow font-bold scale-105'
                    : isUnlocked
                    ? 'bg-[#29221b] text-[#d8c8b4] border-[#4a3b32] hover:border-[#b48c36]/60 hover:text-[#e8dfcc]'
                    : 'bg-[#15100e] text-[#6b5e54] border-[#30241d] hover:border-[#523d32]'
                }`}
                title={
                  isUnlocked
                    ? `${p.numberTitle} (공개됨)`
                    : `${p.numberTitle} (비공개 / GM 잠금 상태)`
                }
              >
                {!isUnlocked && <Lock className="w-3 h-3 text-[#e63946] shrink-0" />}
                {isGm && isUnlocked && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                )}
                <span>{p.numberTitle.split('(')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          MAIN STORYBOOK DISPLAY:
          If NOT unlocked and NOT GM -> Show atmospheric Locked Gate!
          If Unlocked (or GM) -> Show full vintage story paper page!
         ========================================================= */}
      {!isPhaseUnlocked && !isGm ? (
        /* LOCKED SCREEN FOR PLAYERS / DETECTIVES */
        <article
          className="relative bg-[#1a1410] text-[#e8dfcc] border-2 border-[#800f13] p-6 sm:p-10 shadow-2xl rounded-sm text-center space-y-6 font-serif animate-fade-in"
          style={{
            boxShadow: '0 10px 40px rgba(0,0,0,0.8), inset 0 0 60px rgba(128, 15, 19, 0.2)',
          }}
        >
          {/* Art deco locked corner brackets */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#800f13]" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#800f13]" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#800f13]" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#800f13]" />

          {/* Locked Gate Icon & Confidential Stamp */}
          <div className="flex flex-col items-center justify-center pt-4">
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full bg-[#2a1215] border-2 border-[#9b2226] flex items-center justify-center text-[#e63946] shadow-xl animate-pulse">
                <Lock className="w-10 h-10" />
              </div>
              <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-[#8b261e] text-[#f5ede1] text-[10px] font-bold border border-[#d4af37] tracking-widest stamp-seal shadow">
                極秘 封印
              </div>
            </div>

            <span className="text-xs text-[#a89988] tracking-widest font-mono uppercase mb-1">
              [ 探偵禁止區域 · STEP LOCKED ]
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-title text-[#f5ede1] mb-2">
              이 단계는 아직 열리지 않았습니다
            </h2>
            <div className="inline-block px-3 py-1 bg-[#231713] border border-[#b48c36]/40 text-[#d4af37] text-xs font-bold mb-4">
              {phase.numberTitle} : {phase.name}
            </div>
          </div>

          {/* Explanation Box */}
          <div className="max-w-lg mx-auto bg-[#140f0c] p-4 sm:p-5 border border-[#3d2f25] rounded-xs text-xs sm:text-sm text-[#c4b5a5] leading-relaxed text-left space-y-2.5">
            <div className="flex items-start gap-2 text-[#e63946] font-bold">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>진행자(GM)의 안내가 있을 때까지 대기해 주십시오.</span>
            </div>
            <p>
              스포일러 방지와 공정한 추리를 위해, 해당 단계의 이야기와 수사 지침은 아직 봉인되어 있습니다.
            </p>
            <p className="text-[#8c7e73] text-[11px]">
              ※ GM이 게임 진행 상황에 맞춰 단계를 해금(ON)하면 자동으로 본문의 내용과 지침이 열립니다.
            </p>
          </div>

          {/* Quick Return to Highest Unlocked Phase */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleSelect(highestUnlockedIndex)}
              className="px-4 py-2 bg-[#8b261e] hover:bg-[#a52a22] text-[#f5ede1] border border-[#b48c36] font-bold text-xs sm:text-sm rounded-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-[#d4af37]" />
              <span>
                현재 공개된 단계로 이동하기 (
                {GAME_PHASES[highestUnlockedIndex]?.numberTitle.split('(')[0]})
              </span>
            </button>
          </div>

          {/* Bottom prev navigation */}
          <footer className="pt-4 border-t border-[#3d2f25] flex items-center justify-between text-xs text-[#8c7e73]">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeTab === 0}
              className="flex items-center gap-1 px-3 py-1.5 border border-[#44362b] bg-[#1a1410] hover:bg-[#251e18] text-[#c4b5a5] rounded-xs cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>이전 단계</span>
            </button>
            <span className="font-mono">봉인 상태 유지 중</span>
          </footer>
        </article>
      ) : (
        /* REGULAR UNLOCKED STORYBOOK PAPER PAGE */
        <article className="relative bg-[#faf6ee] text-[#1f1b18] border-2 border-[#b48c36] p-5 sm:p-8 shadow-2xl rounded-sm">
          {/* Vintage Paper Corner Decors */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#b48c36]" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#b48c36]" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#b48c36]" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#b48c36]" />

          {/* GM Inspection Ribbon if viewing in GM mode */}
          {isGm && (
            <div className="mb-3 px-3 py-1 bg-[#1f1a16] text-[#d4af37] text-xs font-serif flex items-center justify-between border border-[#b48c36]/50">
              <span className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>GM 열람 모드 (모든 단계를 상시 확인할 수 있습니다)</span>
              </span>
              <span
                className={`text-[11px] font-bold px-1.5 py-0.5 rounded-xs ${
                  isPhaseUnlocked
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                    : 'bg-red-950 text-red-300 border border-red-600'
                }`}
              >
                {isPhaseUnlocked ? '탐정에게 공개 중 (ON)' : '탐정에게 비공개 (OFF)'}
              </span>
            </div>
          )}

          {/* Phase Header */}
          <header className="border-b-2 border-[#b48c36]/40 pb-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <span className="inline-block px-2.5 py-0.5 bg-[#9b2226] text-[#faf6ee] text-xs font-serif font-bold tracking-widest border border-[#d4af37]">
                {phase.numberTitle}
              </span>
              {phase.durationMinutes && (
                <span className="flex items-center gap-1 text-xs font-bold text-[#7f1d1d] bg-[#fecaca]/50 border border-[#b91c1c]/30 px-2 py-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  권장 시간: {phase.durationMinutes}분
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-[#1f1b18] tracking-tight mt-1">
              {phase.name}
            </h2>
          </header>

          {/* Narrative / Story to read aloud */}
          {phase.storyContent && (
            <section className="mb-6 bg-[#f3ecdf] border-l-4 border-[#9b2226] p-4 sm:p-5 shadow-inner">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#7f1d1d] flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4" />
                  {phase.storyHeading || '□ 이야기 낭독 (플레이어 중 한 명이 소리 내어 읽습니다)'}
                </h3>
                {(phase.id.includes('interlude1') || phase.id.includes('interlude2')) && (
                  <button
                    type="button"
                    onClick={triggerGramophone}
                    className={`text-xs px-2.5 py-1 bg-[#1f1a16] text-[#d4af37] border border-[#b48c36] hover:bg-[#332822] flex items-center gap-1 transition-transform ${
                      isPlayingGramophone ? 'animate-pulse scale-95' : ''
                    }`}
                    title="가와즈야의 축음기 재생 효과음"
                  >
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    <span>축음기 핸들 돌리기</span>
                  </button>
                )}
              </div>
              <div className="font-serif text-sm sm:text-base leading-relaxed whitespace-pre-line text-[#2c241d] tracking-normal">
                {phase.storyContent}
              </div>
            </section>
          )}

          {/* Special Action Notice (e.g. Story 3 in interlude 1) */}
          {phase.specialActionNotice && (
            <div className="mb-6 p-4 bg-[#e8dfcc] border border-[#b48c36]/60 text-xs sm:text-sm font-serif leading-relaxed whitespace-pre-line text-[#3d2e24]">
              {phase.specialActionNotice}
            </div>
          )}

          {/* Phase Instructions & Checklist */}
          <section className="space-y-3 mb-6">
            <h4 className="font-serif font-bold text-sm text-[#1f1b18] flex items-center gap-1.5 border-b border-[#b48c36]/30 pb-1">
              <Compass className="w-4 h-4 text-[#b48c36]" />
              이 페이즈의 진행 절차 & 수칙
            </h4>
            <ul className="space-y-2">
              {phase.instructions.map((inst, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs sm:text-sm font-serif text-[#332a24] leading-relaxed"
                >
                  <span className="w-4 h-4 rounded-full bg-[#b48c36]/20 border border-[#b48c36] text-[10px] flex items-center justify-center font-mono font-bold shrink-0 mt-0.5 text-[#1f1b18]">
                    {idx + 1}
                  </span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Guidance Alert */}
          {phase.guidanceAlert && (
            <div className="mb-4 p-3 bg-[#fffbeb] border border-[#f59e0b]/50 rounded-xs flex items-start gap-2 text-xs sm:text-sm text-[#92400e] font-serif">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#d97706]" />
              <span>{phase.guidanceAlert}</span>
            </div>
          )}

          {/* Stop Notice */}
          {phase.stopNotice && (
            <div className="mb-4 p-3.5 bg-[#fef2f2] border-2 border-[#b91c1c] rounded-xs flex items-center gap-2.5 text-xs sm:text-sm text-[#991b1b] font-serif font-bold shadow-xs">
              <ShieldAlert className="w-5 h-5 shrink-0 text-[#b91c1c]" />
              <span>{phase.stopNotice}</span>
            </div>
          )}

          {/* Navigation Buttons (Prev / Next) */}
          <footer className="pt-4 border-t-2 border-[#b48c36]/40 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeTab === 0}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 border font-serif text-xs sm:text-sm transition-colors ${
                activeTab === 0
                  ? 'opacity-40 cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400'
                  : 'border-[#b48c36] bg-[#f4ede0] hover:bg-[#e8dfcc] text-[#1f1b18] cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>이전 단계</span>
            </button>

            <div className="text-center font-serif text-xs text-[#574e47] hidden sm:block">
              {phase.name}
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={activeTab === GAME_PHASES.length - 1}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 border font-serif text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === GAME_PHASES.length - 1
                  ? 'opacity-40 cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400'
                  : 'border-[#9b2226] bg-[#9b2226] hover:bg-[#7f1d1d] text-[#faf6ee] shadow-sm'
              }`}
            >
              <span>다음 단계</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </footer>
        </article>
      )}
    </div>
  );
};
