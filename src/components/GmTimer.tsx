import React, { useState, useEffect, useRef } from 'react';
import { playWatchTick, playBrassChime } from '../utils/sound';
import { Play, Pause, RotateCcw, Plus, Minus, Maximize, Minimize, Volume2, VolumeX, Clock } from 'lucide-react';

interface GmTimerProps {
  initialMinutes?: number;
  onPhaseChange?: (phaseIndex: number) => void;
}

const PHASES = [
  { name: '1단계: 사건 브리핑 & 자기소개', desc: '각자 인물의 공개 정보와 당일 행적 소개' },
  { name: '2단계: 1차 단서 조사 & 자유 밀담', desc: '의심스러운 인물들과 1:1 또는 소그룹 밀담' },
  { name: '3단계: 2차 추가 심문 & 현장 검증', desc: '모순된 알리바이 추궁 및 유류품 검증' },
  { name: '4단계: 최종 추리 발표', desc: '전체 인물이 돌아가며 지목할 범인과 트릭 추리' },
  { name: '5단계: 최후의 투표 & 진상 공개', desc: '가장 의심스러운 1인 동시 지목 및 GM 진상 공개' },
];

export const GmTimer: React.FC<GmTimerProps> = ({ initialMinutes = 60 }) => {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  // Countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (soundOn) playBrassChime();
            return 0;
          }
          // Sound tick on final 60 seconds or every 10 seconds
          if (soundOn && (prev <= 60 || prev % 10 === 0)) {
            playWatchTick(prev % 2 === 0 ? 'tick' : 'tock');
          }
          // Sound warning at exactly 5m, 1m
          if (soundOn && (prev === 300 || prev === 60)) {
            playBrassChime();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, remainingSeconds, soundOn]);

  const toggleRun = () => setIsRunning(!isRunning);

  const handleReset = () => {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
  };

  const addMinutes = (mins: number) => {
    setRemainingSeconds((prev) => Math.max(0, prev + mins * 60));
  };

  const handleSetDuration = (mins: number) => {
    setIsRunning(false);
    setTotalSeconds(mins * 60);
    setRemainingSeconds(mins * 60);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const isUrgent = remainingSeconds > 0 && remainingSeconds <= 300; // < 5 minutes
  const isCritical = remainingSeconds > 0 && remainingSeconds <= 60; // < 1 minute
  const isFinished = remainingSeconds === 0;

  const progressPercent = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={`relative p-5 sm:p-6 transition-all font-serif ${
        isFullscreen
          ? 'fixed inset-0 z-50 flex flex-col justify-center items-center bg-[#100d0b] text-[#f5ede1] p-8'
          : 'bg-[#1e1814] border-2 border-[#b48c36] rounded-sm text-[#e8dfcc]'
      }`}
      style={{
        boxShadow: isUrgent
          ? '0 0 35px rgba(230, 57, 70, 0.35), inset 0 0 50px rgba(155, 34, 38, 0.25)'
          : '0 4px 20px rgba(0,0,0,0.5)',
      }}
    >
      {/* Background Vintage Watermark */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#b48c36]/5 to-transparent pointer-events-none" />

      {/* Top Bar */}
      <div className="relative flex items-center justify-between pb-3 mb-4 border-b border-[#b48c36]/30 w-full max-w-2xl">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#d4af37]" />
          <h3 className="font-bold text-base text-[#f5ede1] tracking-wide">
            수사 진행 타이머
          </h3>
          <span className="text-xs text-[#a89988] hidden sm:inline">
            (경성 시계탑 모티프)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundOn(!soundOn)}
            className={`p-1.5 rounded-sm border transition-colors ${
              soundOn ? 'border-[#b48c36]/60 text-[#d4af37] bg-[#27201a]' : 'border-neutral-700 text-neutral-500'
            }`}
            title={soundOn ? '음향 끄기' : '음향 켜기'}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-sm border border-[#b48c36]/60 text-[#d4af37] bg-[#27201a] hover:bg-[#342a22] transition-colors"
            title={isFullscreen ? '전체화면 종료' : '대형 화면 / 빔프로젝터 모드'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Phase Indicator */}
      <div className="relative w-full max-w-2xl mb-6">
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-2">
          {PHASES.map((phase, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentPhase(idx);
                if (soundOn) playBrassChime();
              }}
              className={`px-2.5 py-1 text-xs border rounded-sm transition-all cursor-pointer ${
                currentPhase === idx
                  ? 'border-[#b48c36] bg-[#8b261e] text-[#f5ede1] font-bold shadow-md'
                  : 'border-[#5a483a] bg-[#140f0c] text-[#a89988] hover:text-[#e8dfcc]'
              }`}
            >
              {idx + 1}단계
            </button>
          ))}
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-[#d4af37]">
            {PHASES[currentPhase].name}
          </div>
          <div className="text-xs text-[#a89988] mt-0.5">
            {PHASES[currentPhase].desc}
          </div>
        </div>
      </div>

      {/* Pocket Watch Dial & Digital Display */}
      <div className="relative flex flex-col items-center justify-center my-3 w-full max-w-xl">
        {/* Urgent Warning Banner */}
        {isUrgent && (
          <div
            className={`mb-3 px-4 py-1 text-xs font-bold border tracking-widest uppercase transition-all ${
              isCritical
                ? 'bg-[#9b2226] border-[#ff4d4d] text-white animate-pulse'
                : 'bg-[#7a141b]/80 border-[#b48c36] text-[#ffccd5]'
            }`}
          >
            {isCritical ? '⚠️ 종결 임박! 최후의 1분!' : '⏳ 시간 종료 5분 전 — 추리를 정리하십시오'}
          </div>
        )}

        {isFinished && (
          <div className="mb-3 px-5 py-1.5 bg-[#9b2226] border-2 border-[#f5ede1] text-[#f5ede1] font-bold text-sm tracking-wider animate-bounce">
            종료! 모든 수사를 멈추고 최종 투표를 시작하십시오!
          </div>
        )}

        {/* Vintage Dial Frame */}
        <div
          className={`relative flex items-center justify-center rounded-full border-4 transition-all ${
            isFullscreen ? 'w-80 h-80 sm:w-96 sm:h-96' : 'w-56 h-56 sm:w-64 sm:h-64'
          } ${
            isUrgent
              ? 'border-[#e63946] bg-gradient-to-b from-[#2a0e10] to-[#140608]'
              : 'border-[#b48c36] bg-gradient-to-b from-[#221c17] to-[#120f0d]'
          }`}
          style={{
            boxShadow: isUrgent
              ? '0 0 40px rgba(230, 57, 70, 0.4), inset 0 0 30px rgba(155, 34, 38, 0.5)'
              : '0 0 30px rgba(0,0,0,0.8), inset 0 0 30px rgba(180, 140, 54, 0.15)',
          }}
        >
          {/* Circular Hour Ticks & Vintage Roman Numbers */}
          <div className="absolute inset-2 rounded-full border border-dashed border-[#b48c36]/30 pointer-events-none" />

          {/* Background Rotating Watch Gears */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full pointer-events-none opacity-20">
            {/* Gear 1 (large clockwise) */}
            <svg
              viewBox="0 0 100 100"
              className={`w-48 h-48 sm:w-56 sm:h-56 text-[#b48c36] fill-current -top-4 -left-4 absolute ${
                isRunning ? 'animate-gear-spin' : ''
              }`}
            >
              <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="4" />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <rect
                  key={deg}
                  x="48"
                  y="10"
                  width="4"
                  height="10"
                  transform={`rotate(${deg} 50 50)`}
                  fill="currentColor"
                />
              ))}
              <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>

            {/* Gear 2 (small counter-clockwise) */}
            <svg
              viewBox="0 0 100 100"
              className={`w-36 h-36 sm:w-44 sm:h-44 text-[#800f13] fill-current -bottom-2 -right-2 absolute ${
                isRunning ? 'animate-gear-spin-reverse' : ''
              }`}
            >
              <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" strokeWidth="3" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <rect
                  key={deg}
                  x="48"
                  y="16"
                  width="4"
                  height="9"
                  transform={`rotate(${deg} 50 50)`}
                  fill="currentColor"
                />
              ))}
            </svg>
          </div>

          {/* Ticking Second Hand (moves each second when running) */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out"
            style={{
              transform: `rotate(${(seconds * 6)}deg)`,
            }}
          >
            <div className="w-0.5 h-20 sm:h-24 bg-gradient-to-t from-transparent via-[#d4af37] to-[#e63946] absolute bottom-1/2 origin-bottom shadow-sm" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37] border border-[#140f0c] absolute z-20" />
          </div>

          {/* Time Digits */}
          <div className="flex flex-col items-center justify-center z-10 text-center">
            <span className="text-[10px] tracking-widest text-[#a89988] uppercase mb-1 font-serif">
              REMAINING TIME
            </span>
            <div
              className={`font-deco font-bold tracking-tight transition-transform ${
                isRunning && remainingSeconds % 2 === 0 ? 'scale-[1.02]' : 'scale-100'
              } ${
                isFullscreen ? 'text-7xl sm:text-8xl' : 'text-5xl sm:text-6xl'
              } ${isUrgent ? 'text-[#ff4d6d]' : 'text-[#f5ede1]'}`}
            >
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <span className="text-xs text-[#d4af37] mt-1 font-serif">
              {isRunning ? '수사 진행 중' : isFinished ? '시간 종료' : '일시 정지'}
            </span>
          </div>

          {/* Rotating Progress Arc Border */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              cx="50%"
              cy="50%"
              r="46%"
              fill="none"
              stroke={isUrgent ? 'rgba(230,57,70,0.8)' : 'rgba(180,140,54,0.6)'}
              strokeWidth="4"
              strokeDasharray="290"
              strokeDashoffset={290 - (290 * progressPercent) / 100}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="relative flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-3 w-full max-w-xl">
        <button
          onClick={toggleRun}
          className={`px-5 py-2.5 rounded-sm border font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer ${
            isRunning
              ? 'bg-[#5c3716] border-[#d4af37] text-[#f5ede1] hover:brightness-110'
              : 'bg-[#8b261e] border-[#b48c36] text-[#f5ede1] hover:brightness-110 shadow-lg'
          }`}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#d4af37]" />}
          <span>{isRunning ? '일시정지' : '타이머 시작'}</span>
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2.5 rounded-sm border border-[#5a483a] bg-[#140f0c] hover:bg-[#251e18] text-[#c2b092] text-sm flex items-center gap-1.5 cursor-pointer"
          title="처음으로 리셋"
        >
          <RotateCcw className="w-4 h-4" />
          <span>초기화</span>
        </button>

        <button
          onClick={() => addMinutes(5)}
          className="px-3 py-2.5 rounded-sm border border-[#5a483a] bg-[#140f0c] hover:bg-[#251e18] text-[#d4af37] text-xs flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>5분 추가</span>
        </button>

        <button
          onClick={() => addMinutes(-5)}
          className="px-3 py-2.5 rounded-sm border border-[#5a483a] bg-[#140f0c] hover:bg-[#251e18] text-[#c2b092] text-xs flex items-center gap-1 cursor-pointer"
        >
          <Minus className="w-3.5 h-3.5" />
          <span>5분 단축</span>
        </button>
      </div>

      {/* Quick Presets */}
      <div className="relative flex items-center justify-center gap-2 text-xs text-[#a89988] mt-2">
        <span className="text-[11px]">기본 시간 설정:</span>
        {[30, 45, 60, 90].map((mins) => (
          <button
            key={mins}
            onClick={() => handleSetDuration(mins)}
            className={`px-2 py-0.5 rounded border transition-colors ${
              totalSeconds === mins * 60
                ? 'border-[#b48c36] text-[#d4af37] bg-[#27201b]'
                : 'border-[#44362b] hover:text-[#f5ede1]'
            }`}
          >
            {mins}분
          </button>
        ))}
      </div>
    </div>
  );
};
