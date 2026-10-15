import React, { useState, useEffect } from 'react';
import { defaultScenario } from './data/defaultScenario';
import { ScenarioData, CharacterData } from './types/scenario';
import { CharacterSilhouette } from './components/CharacterSilhouette';
import { SecretDossierModal } from './components/SecretDossierModal';
import { DetectiveNotebook } from './components/DetectiveNotebook';
import { GmConsole } from './components/GmConsole';
import { isSoundEnabled, setSoundEnabled, playBrassChime } from './utils/sound';
import {
  Compass,
  FileText,
  Users,
  BookOpen,
  Lock,
  Volume2,
  VolumeX,
  ShieldAlert,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export default function App() {
  const [scenario, setScenario] = useState<ScenarioData>(() => {
    try {
      const saved = localStorage.getItem('boardbang_custom_scenario');
      return saved ? JSON.parse(saved) : defaultScenario;
    } catch {
      return defaultScenario;
    }
  });

  // Current view: 'cover' (신문 호외 대문), 'player' (탐정 수사 화면), 'gm' (GM 콘솔)
  const [currentView, setCurrentView] = useState<'cover' | 'player' | 'gm'>('cover');

  // Player tabs: 'synopsis', 'characters', 'notebook'
  const [playerTab, setPlayerTab] = useState<'synopsis' | 'characters' | 'notebook'>('synopsis');

  // Character secret dossier modal
  const [selectedCharForSecret, setSelectedCharForSecret] = useState<CharacterData | null>(null);

  // Expanded character cards for public info
  const [expandedPublicCardId, setExpandedPublicCardId] = useState<string | null>(null);

  // Sound toggle
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const handleUpdateScenario = (updated: ScenarioData) => {
    setScenario(updated);
    try {
      localStorage.setItem('boardbang_custom_scenario', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetToDefault = () => {
    if (confirm('기본 시나리오(낙원구락부 밀실 살인사건)로 초기화하시겠습니까?')) {
      localStorage.removeItem('boardbang_custom_scenario');
      setScenario(defaultScenario);
      alert('기본 시나리오로 복원되었습니다.');
    }
  };

  return (
    <div className="min-h-screen text-[#e8dfcc] font-serif flex flex-col selection:bg-[#8b261e] selection:text-[#fbf9f5]">
      {/* GLOBAL HEADER BAR - Vintage Newspaper Masthead Style */}
      <header className="border-b border-[#b48c36]/40 bg-[#161210]/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <button
            onClick={() => setCurrentView('cover')}
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity text-left cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-sm bg-[#8b261e] border border-[#b48c36] flex items-center justify-center text-[#f5ede1] font-bold text-xs shadow-md">
              號外
            </div>
            <div>
              <div className="text-xs tracking-widest text-[#d4af37] font-deco font-bold uppercase">
                BOARD BANGJEONG
              </div>
              <div className="text-sm sm:text-base font-bold font-title text-[#f5ede1] -mt-0.5">
                보드방정 머더미스터리
              </div>
            </div>
          </button>

          {/* Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleToggleSound}
              className={`p-1.5 rounded-sm border transition-colors ${
                soundOn
                  ? 'border-[#b48c36]/60 text-[#d4af37] bg-[#241c18]'
                  : 'border-neutral-700 text-neutral-500'
              }`}
              title={soundOn ? '효과음 끄기' : '효과음 켜기'}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {currentView === 'gm' ? (
              <button
                onClick={() => setCurrentView('player')}
                className="px-3 py-1.5 bg-[#251e18] hover:bg-[#342a22] border border-[#b48c36]/60 text-[#f5ede1] text-xs font-semibold rounded-sm transition-all cursor-pointer"
              >
                탐정 화면으로
              </button>
            ) : (
              <button
                onClick={() => {
                  setCurrentView('gm');
                  playBrassChime();
                }}
                className="px-3 py-1.5 bg-[#8b261e] hover:bg-[#a31621] border border-[#b48c36] text-[#f5ede1] text-xs font-bold rounded-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>GM 입장</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-6">
        {/* ========================================================
            1. COVER VIEW (첫 화면: 1931년 경성일보 호외 1면)
           ======================================================== */}
        {currentView === 'cover' && (
          <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            {/* Vintage Newspaper Extra Front Page Banner */}
            <div
              className="p-6 sm:p-10 bg-[#f7f2e7] text-[#1c1917] border-4 double border-[#2b241e] shadow-2xl relative"
              style={{
                boxShadow: '0 10px 40px rgba(0,0,0,0.8), inset 0 0 50px rgba(0,0,0,0.06)',
              }}
            >
              {/* Corner Art Deco Accents */}
              <div className="absolute top-2 left-2 text-[10px] text-[#7a6a5d] font-deco">
                VOL. 1931 · NO. 1104
              </div>
              <div className="absolute top-2 right-2 stamp-seal px-2 py-0.5 text-xs">
                特別 號外
              </div>

              {/* Newspaper Masthead */}
              <div className="text-center border-b-2 border-[#1c1917] pb-4 mb-4 mt-2">
                <div className="text-xs sm:text-sm tracking-widest text-[#57483b] uppercase font-sans font-semibold">
                  BOARD GAME CLUB · BOARD BANGJEONG
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold font-title tracking-tight text-[#1c1917] my-1">
                  京城 特別 號外
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-xs text-[#57483b] border-t border-b border-[#1c1917]/30 py-1.5 mt-2">
                  <span>{scenario.date}</span>
                  <span className="hidden sm:inline">·</span>
                  <span>{scenario.location}</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="text-[#9b2226] font-bold">비상 긴급 보도</span>
                </div>
              </div>

              {/* Headline Story */}
              <div className="my-6 text-center">
                <div className="inline-block px-3 py-1 bg-[#800f13] text-[#f5ede1] font-bold text-xs tracking-wider mb-3 rounded-none uppercase">
                  殺人事件 速報
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold font-title text-[#1c1917] leading-snug tracking-tight">
                  『{scenario.title}』
                </h2>
                <p className="text-sm sm:text-base text-[#614f41] mt-2 italic font-serif">
                  — {scenario.subtitle} —
                </p>
              </div>

              {/* Newspaper 2-column style story teaser */}
              <div className="border-t border-b border-[#1c1917]/20 py-4 my-4 grid grid-cols-1 md:grid-cols-12 gap-5 text-xs sm:text-sm leading-relaxed text-[#2c241e]">
                <div className="md:col-span-8 space-y-3 font-serif">
                  <p className="first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-[#800f13] leading-relaxed">
                    {scenario.synopsis.split('\n')[0]}
                  </p>
                  <p className="text-[#4a3d34]">
                    현장에 억류된 5인의 주요 용의자들은 저마다의 알리바이와 무고함을 주장하고 있으나, 모두 피해자에게 치명적인 원한이나 말 못 할 비밀을 품고 있음이 드러났다.
                  </p>
                </div>

                {/* Victim Wanted / Incident Profile Stamp Box */}
                <div className="md:col-span-4 p-3 bg-[#ebe4d3] border border-[#2b241e]/40 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-[#800f13] border-b border-[#800f13]/30 pb-1 mb-1.5 font-serif">
                      【피해자 신원 기록】
                    </div>
                    <div className="text-xs font-bold text-[#1c1917]">
                      {scenario.victim.name} ({scenario.victim.age}세)
                    </div>
                    <div className="text-[11px] text-[#57483b] mt-1 leading-normal font-sans">
                      {scenario.victim.description}
                    </div>
                  </div>
                  <div className="text-[10px] text-[#800f13] font-bold mt-2 pt-1 border-t border-[#2b241e]/20">
                    사인: {scenario.victim.causeOfDeath.split('(')[0]}
                  </div>
                </div>
              </div>

              {/* TWO-BRANCH ACTION ENTRY */}
              <div className="mt-8 pt-4 border-t-2 border-[#1c1917] grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                {/* Branch 1: Player / Detective Entry */}
                <button
                  onClick={() => {
                    setCurrentView('player');
                    setPlayerTab('synopsis');
                    playBrassChime();
                  }}
                  className="p-4 sm:p-5 bg-gradient-to-br from-[#800f13] to-[#590d10] text-[#f5ede1] border-2 border-[#2b241e] hover:brightness-110 active:scale-[0.99] transition-all flex flex-col justify-between text-left shadow-lg cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-serif font-bold px-2 py-0.5 bg-[#f5ede1] text-[#800f13]">
                        플레이어 전용
                      </span>
                      <Compass className="w-5 h-5 text-[#d4af37] group-hover:rotate-45 transition-transform" />
                    </div>
                    <div className="text-lg font-bold font-title text-[#f5ede1]">
                      탐정으로 수사 착수
                    </div>
                    <p className="text-xs text-[#f5ede1]/80 mt-1 leading-relaxed">
                      사건 개요 확인, 용의자 공개 정보 열람, 배정받은 역할의 극비 밀서 확인
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-[#d4af37] font-bold">
                    <span>수사본부 입장하기</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* Branch 2: GM Entry */}
                <button
                  onClick={() => {
                    setCurrentView('gm');
                    playBrassChime();
                  }}
                  className="p-4 sm:p-5 bg-[#1f1915] text-[#f5ede1] border-2 border-[#b48c36] hover:bg-[#2a221d] active:scale-[0.99] transition-all flex flex-col justify-between text-left shadow-lg cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-serif font-bold px-2 py-0.5 border border-[#b48c36] text-[#d4af37]">
                        진행자 (GM)
                      </span>
                      <Lock className="w-5 h-5 text-[#b48c36]" />
                    </div>
                    <div className="text-lg font-bold font-title text-[#f5ede1]">
                      GM 진행 콘솔 입장
                    </div>
                    <p className="text-xs text-[#a89988] mt-1 leading-relaxed">
                      진행 타이머 (대형 화면 모드), 전 인물 밀서 총람, 시나리오 수정 및 내보내기
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-[#d4af37] font-bold">
                    <span>비밀번호 인증 후 입장</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>

              {/* Footer Note */}
              <div className="text-center text-[11px] text-[#7a6a5d] mt-6 border-t border-[#1c1917]/20 pt-2 font-serif">
                보드게임 모임 [보드방정] 전용 웹도구 · 클라이언트 암호화(AES-GCM) 적용 · 무단 복제 금지
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            2. PLAYER VIEW (탐정 수사 화면)
           ======================================================== */}
        {currentView === 'player' && (
          <div className="space-y-6 animate-fade-in">
            {/* Incident Header Ribbon */}
            <div className="p-4 sm:p-5 bg-[#1f1814] border-2 border-[#b48c36] shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#b48c36]/30 pb-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 bg-[#8b261e] border border-[#b48c36] text-[#f5ede1] font-bold font-serif">
                      수사 수첩
                    </span>
                    <span className="text-xs text-[#d4af37]">
                      『{scenario.title}』
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-title text-[#f5ede1]">
                    경성 종로 낙원구락부 살인사건 수사본부
                  </h2>
                </div>

                <div className="text-xs text-[#a89988] sm:text-right space-y-0.5">
                  <div className="flex items-center sm:justify-end gap-1.5 text-[#d4af37]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{scenario.date}</span>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{scenario.location}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-semibold">
                <button
                  onClick={() => setPlayerTab('synopsis')}
                  className={`px-3.5 py-1.5 rounded-sm border transition-all flex items-center gap-1.5 cursor-pointer ${
                    playerTab === 'synopsis'
                      ? 'border-[#b48c36] bg-[#8b261e] text-[#f5ede1] font-bold shadow-md'
                      : 'border-[#5a483a] bg-[#140f0c] text-[#a89988] hover:text-[#f5ede1]'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>사건 개요 & 현장</span>
                </button>

                <button
                  onClick={() => setPlayerTab('characters')}
                  className={`px-3.5 py-1.5 rounded-sm border transition-all flex items-center gap-1.5 cursor-pointer ${
                    playerTab === 'characters'
                      ? 'border-[#b48c36] bg-[#8b261e] text-[#f5ede1] font-bold shadow-md'
                      : 'border-[#5a483a] bg-[#140f0c] text-[#a89988] hover:text-[#f5ede1]'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>5인의 용의자 & 밀서 ({scenario.characters.length}명)</span>
                </button>

                <button
                  onClick={() => setPlayerTab('notebook')}
                  className={`px-3.5 py-1.5 rounded-sm border transition-all flex items-center gap-1.5 cursor-pointer ${
                    playerTab === 'notebook'
                      ? 'border-[#b48c36] bg-[#8b261e] text-[#f5ede1] font-bold shadow-md'
                      : 'border-[#5a483a] bg-[#140f0c] text-[#a89988] hover:text-[#f5ede1]'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>탐정 수사 메모 & 판별</span>
                </button>
              </div>
            </div>

            {/* TAB 1: SYNOPSIS & CRIME SCENE */}
            {playerTab === 'synopsis' && (
              <div className="space-y-6">
                {/* Full Synopsis Card */}
                <div className="p-5 sm:p-6 bg-[#1b1512] border border-[#b48c36]/40 rounded-sm shadow-md space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#3a2e24] pb-2 text-[#d4af37]">
                    <FileText className="w-5 h-5" />
                    <h3 className="font-bold text-base text-[#f5ede1] font-title">
                      사건 시놉시스 (전말과 배경)
                    </h3>
                  </div>

                  <div className="text-sm leading-relaxed text-[#e0d6c5] whitespace-pre-wrap font-sans space-y-3 font-normal">
                    {scenario.synopsis}
                  </div>
                </div>

                {/* Victim & Scene Profile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Victim Dossier */}
                  <div className="p-5 bg-[#231816] border border-[#9b2226]/50 rounded-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-[#9b2226]/30 pb-2">
                      <div className="flex items-center gap-2 text-[#e63946]">
                        <AlertTriangle className="w-4 h-4" />
                        <h4 className="font-bold text-sm font-title text-[#f5ede1]">
                          피해자 감식 보고서
                        </h4>
                      </div>
                      <span className="text-[11px] px-1.5 py-0.2 border border-[#9b2226] text-[#ff8fa3]">
                        사망 확인
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-[#d8c8b4] font-sans">
                      <div>
                        <strong className="text-[#f5ede1]">성명 / 연령:</strong>{' '}
                        {scenario.victim.name} ({scenario.victim.age}세)
                      </div>
                      <div>
                        <strong className="text-[#f5ede1]">신분:</strong>{' '}
                        {scenario.victim.description}
                      </div>
                      <div>
                        <strong className="text-[#e63946]">직접 사인:</strong>{' '}
                        {scenario.victim.causeOfDeath}
                      </div>
                    </div>
                  </div>

                  {/* Crime Scene Dossier */}
                  <div className="p-5 bg-[#1b1714] border border-[#b48c36]/40 rounded-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-[#3d3128] pb-2">
                      <div className="flex items-center gap-2 text-[#d4af37]">
                        <Compass className="w-4 h-4" />
                        <h4 className="font-bold text-sm font-title text-[#f5ede1]">
                          사건 현장 (완전 밀실 상태)
                        </h4>
                      </div>
                      <span className="text-[11px] px-1.5 py-0.2 border border-[#b48c36] text-[#d4af37]">
                        현장 보존
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-[#d8c8b4] font-sans">
                      <div>
                        <strong className="text-[#f5ede1]">발견 장소:</strong>{' '}
                        {scenario.victim.crimeScene}
                      </div>
                      <div className="leading-relaxed">
                        <strong className="text-[#d4af37]">현장 단서:</strong>{' '}
                        테이블 위 깨진 와인병 파편, 붉은 루즈가 번진 프랑스제 향수 냄새의 비단 손수건, 벽난로 재 속의 탄 전보 조각, 바닥의 은장도 자상 혈흔.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Session Rules & Etiquette */}
                <div className="p-4 sm:p-5 bg-[#161210] border border-[#44362b] rounded-sm text-xs font-sans space-y-2">
                  <div className="font-bold text-[#d4af37] font-serif text-sm flex items-center gap-1.5 mb-1">
                    <HelpCircle className="w-4 h-4" />
                    <span>머더미스터리 진행 규칙 & 신사 숙녀의 예절</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[#b8a995]">
                    {scenario.rulesAndEtiquette.map((rule, idx) => (
                      <li key={idx}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: CHARACTERS & SECRET DOSSIERS */}
            {playerTab === 'characters' && (
              <div className="space-y-6">
                <div className="p-3 bg-[#241c18] border border-[#b48c36]/40 rounded-sm text-xs text-[#d4af37] flex items-center justify-between">
                  <span>
                    💡 각자 배정받은 인물 카드의 <strong>[밀서 열람]</strong> 버튼을 누르고 비밀번호를 입력하십시오.
                  </span>
                  <span className="text-[11px] text-[#a89988] hidden sm:inline">
                    비공개 정보는 AES-GCM으로 안전하게 암호화되어 있습니다.
                  </span>
                </div>

                {/* Suspect Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {scenario.characters.map((char) => {
                    const isPublicExpanded = expandedPublicCardId === char.id;

                    return (
                      <div
                        key={char.id}
                        className="bg-[#1b1512] border-2 border-[#b48c36]/50 rounded-sm shadow-xl flex flex-col justify-between overflow-hidden transition-all hover:border-[#b48c36]"
                        style={{
                          boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                        }}
                      >
                        {/* Card Top: Silhouette & Core Identity */}
                        <div className="p-4 sm:p-5 flex gap-4">
                          {/* Silhouette Frame */}
                          <div className="shrink-0">
                            <CharacterSilhouette type={char.avatarIcon} size={76} />
                          </div>

                          {/* Identity Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-lg font-bold font-title text-[#f5ede1]">
                                {char.name}
                              </h4>
                              {char.hanchaName && (
                                <span className="text-xs text-[#a89988]">
                                  ({char.hanchaName})
                                </span>
                              )}
                              <span className="text-[11px] px-1.5 py-0.2 border border-[#b48c36]/50 text-[#d4af37] bg-[#241c18]">
                                {char.gender} / {char.age}세
                              </span>
                            </div>

                            <div className="text-xs text-[#d4af37] font-semibold mt-0.5">
                              {char.occupation}
                            </div>

                            <p className="text-xs text-[#c2b092] mt-1.5 line-clamp-2 leading-relaxed">
                              {char.summary}
                            </p>
                          </div>
                        </div>

                        {/* Public Info Accordion */}
                        <div className="px-4 sm:px-5 pb-3">
                          <button
                            onClick={() =>
                              setExpandedPublicCardId(isPublicExpanded ? null : char.id)
                            }
                            className="w-full py-1.5 px-2 bg-[#231a16] border border-[#3d3128] text-xs text-[#c2b092] hover:text-[#f5ede1] flex items-center justify-between rounded-sm transition-colors cursor-pointer"
                          >
                            <span>공개 정보 (인상착의, 알리바이, 소지품)</span>
                            {isPublicExpanded ? (
                              <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {isPublicExpanded && (
                            <div className="mt-2.5 p-3 bg-[#140f0d] border border-[#3d3128] rounded-sm text-xs space-y-2 text-[#d8c8b4] font-sans animate-fade-in leading-relaxed">
                              <div>
                                <strong className="text-[#f5ede1]">외모:</strong>{' '}
                                {char.publicInfo.appearance}
                              </div>
                              <div>
                                <strong className="text-[#f5ede1]">사건 당일 행적:</strong>{' '}
                                {char.publicInfo.timeline}
                              </div>
                              <div>
                                <strong className="text-[#f5ede1]">공개 증언:</strong>{' '}
                                "{char.publicInfo.testimony}"
                              </div>
                              <div>
                                <strong className="text-[#d4af37]">소지품:</strong>{' '}
                                {char.publicInfo.belongings.join(', ')}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Card Bottom: Secret Dossier Trigger Button */}
                        <div className="p-3 bg-[#241c18] border-t border-[#b48c36]/30 flex items-center justify-between gap-3">
                          <div className="text-[11px] text-[#a89988]">
                            역할 비밀번호 필요
                          </div>

                          <button
                            onClick={() => setSelectedCharForSecret(char)}
                            className="py-2 px-3.5 bg-gradient-to-r from-[#800f13] to-[#590d10] hover:brightness-110 active:scale-[0.98] text-[#f5ede1] text-xs font-bold border border-[#b48c36] shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
                          >
                            <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                            <span>밀서 열람 (極秘)</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: PERSONAL NOTEBOOK */}
            {playerTab === 'notebook' && (
              <DetectiveNotebook characters={scenario.characters} />
            )}
          </div>
        )}

        {/* ========================================================
            3. GM CONSOLE VIEW (진행자 통제실)
           ======================================================== */}
        {currentView === 'gm' && (
          <div className="animate-fade-in">
            <GmConsole
              scenario={scenario}
              onUpdateScenario={handleUpdateScenario}
              onExit={() => setCurrentView('player')}
            />
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-[#b48c36]/30 bg-[#120f0d] text-xs text-[#7a6a5d] py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <div className="font-bold text-[#a89988] font-title">
              보드게임 모임 "보드방정" 머더미스터리 진행기
            </div>
            <div className="text-[11px] text-[#615246] mt-0.5">
              1920-30s Gyeongseong Modern Noir · Web Crypto PBKDF2 + AES-GCM
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={handleResetToDefault}
              className="text-[#8c7e73] hover:text-[#d4af37] underline transition-colors cursor-pointer"
            >
              기본 시나리오 복원
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentView('cover')}
              className="text-[#8c7e73] hover:text-[#d4af37] transition-colors cursor-pointer"
            >
              호외 대문
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentView('gm')}
              className="text-[#8c7e73] hover:text-[#d4af37] transition-colors cursor-pointer"
            >
              GM 모드
            </button>
          </div>
        </div>
      </footer>

      {/* SECRET DOSSIER MODAL */}
      {selectedCharForSecret && (
        <SecretDossierModal
          character={selectedCharForSecret}
          isOpen={!!selectedCharForSecret}
          onClose={() => setSelectedCharForSecret(null)}
        />
      )}
    </div>
  );
}
