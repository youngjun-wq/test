import React, { useState, useEffect } from 'react';
import { defaultScenario } from './data/defaultScenario';
import { ScenarioData, CharacterData } from './types/scenario';
import { CharacterSilhouette } from './components/CharacterSilhouette';
import { SecretDossierModal } from './components/SecretDossierModal';
import { DetectiveNotebook } from './components/DetectiveNotebook';
import { GmConsole } from './components/GmConsole';
import { PhaseStoryBook } from './components/PhaseStoryBook';
import { RoomSyncModal } from './components/RoomSyncModal';
import { getActiveRoomId, DEFAULT_ROOM_ID } from './utils/mqttSync';
import { isSoundEnabled, setSoundEnabled, playBrassChime, playPageFlipSound, playStampSlamSound } from './utils/sound';
import { initCrossDeviceSync, fetchLatestState, SERVER_SYNC_STATUS_EVENT } from './utils/phaseStorage';
import {
  Compass,
  FileText,
  Users,
  BookOpen,
  Lock,
  Wifi,
  Radio,
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
  Search,
  X,
  Flame,
} from 'lucide-react';

interface ClueItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  foundLocation: string;
  description: string;
  forensicNote: string;
}

const CRIME_SCENE_CLUES: ClueItem[] = [
  {
    id: 'clue_knife',
    name: '가슴에 꽂힌 나이프 (치명적 흉기)',
    category: '직접 살해 흉기',
    icon: '🗡️',
    foundLocation: '서재 안락의자에 앉은 가와즈야의 심장',
    description: '예리하고 날카로운 은제 나이프. 안락의자에 앉은 가와즈야의 가슴에 단번에 깊숙이 박혀 대량의 출혈을 일으켰다.',
    forensicNote: '오전 0시, 서재 앞에서 작가가 발견하고 비명을 지름. 형사가 맥을 짚었을 당시 이미 사망한 상태였음.',
  },
  {
    id: 'clue_prophecy',
    name: '가와즈야의 흉악범죄 예언서',
    category: '미완성 원고',
    icon: '📜',
    foundLocation: '서재 마호가니 책상 위',
    description: '명탐정 가와즈야가 은퇴 전 남기겠다고 한 범죄 예언서. 제도의 향후 일어날 흉악 범죄의 추리가 적혀 있다.',
    forensicNote: '가와즈야가 생전 축음기를 통해 언급했던 핵심 문서. 범죄자들의 정체와 수법이 적혀 있을 가능성이 높음.',
  },
  {
    id: 'clue_letter_box',
    name: '여섯 통의 편지가 든 금속제 상자',
    category: '보안 상자',
    icon: '✉️',
    foundLocation: '저택 응접실 중앙 테이블',
    description: '얇고 커다란 회화 형태의 금속제 상자. 가와즈야가 6인에게 각각 남긴 편지가 들어 있으며 자물쇠가 걸려 있다.',
    forensicNote: '「작은 열쇠」 카드를 소지한 자만이 상자를 열 것을 선언할 수 있다.',
  },
  {
    id: 'clue_gramophone',
    name: '가와즈야의 전언 축음기',
    category: '음성 기록',
    icon: '📻',
    foundLocation: '응접실 코너 테이블',
    description: '조수가 태엽을 감아 재생한 나팔형 축음기. 노이즈 섞인 가와즈야의 육성으로 탐정 은퇴와 여흥, 면담을 지시했다.',
    forensicNote: '축음기를 통해 전달된 가와즈야의 전언이 과연 그의 진짜 생존 육성인지, 아니면 미리 녹음된 것인지 의문이 남음.',
  },
  {
    id: 'clue_mask',
    name: '명탐정의 개구리 가면',
    category: '피해자 소지품',
    icon: '🐸',
    foundLocation: '피해자 가와즈야의 얼굴',
    description: '제도의 명탐정 가와즈야 세이지로가 4년간 결코 벗지 않았던 기괴한 녹색 개구리 가면.',
    forensicNote: '시신의 얼굴에 씌워져 있던 가면. 제도의 수사 고문이자 전설적인 명탐정의 진짜 얼굴은 무엇이었는가.',
  },
  {
    id: 'clue_dossier',
    name: '자료실의 K·R·M 비밀 수사철',
    category: '기록 문서',
    icon: '📁',
    foundLocation: '저택 1층 안쪽 극비 자료실',
    description: '가와즈야가 모아둔 수사 자료들. K(까마귀 사건), R(후시미 리쓰코 사건), M(오오기 마리코 사건)의 알파벳 메모가 적혀 있다.',
    forensicNote: '3장 조사 페이즈에서 플레이어들이 열람할 수 있는 핵심 단서 더미.',
  },
];

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

  // Player tabs: 'phases' (14단계 스토리 & 룰), 'characters' (6인 용의자), 'synopsis' (사건 개요), 'notebook' (수사 메모)
  const [playerTab, setPlayerTab] = useState<'phases' | 'characters' | 'synopsis' | 'notebook'>('phases');

  // Current game phase index (0 to 13)
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);

  // Selected clue for inspection modal
  const [selectedClue, setSelectedClue] = useState<ClueItem | null>(null);

  // Character secret dossier modal
  const [selectedCharForSecret, setSelectedCharForSecret] = useState<CharacterData | null>(null);

  // Expanded character cards for public info
  const [expandedPublicCardId, setExpandedPublicCardId] = useState<string | null>(null);

  // Sound toggle
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  // Real-time cross-device sync status & Room modal
  const [syncStatus, setSyncStatus] = useState<{ connected: boolean; mode: string }>({ connected: true, mode: 'init' });
  const [isRoomModalOpen, setIsRoomModalOpen] = useState<boolean>(false);
  const [activeRoom, setActiveRoom] = useState<string>(() => getActiveRoomId());

  useEffect(() => {
    const cleanup = initCrossDeviceSync();
    const handleSyncStatus = (e: any) => {
      if (e.detail) {
        setSyncStatus(e.detail);
        if (e.detail.roomId) setActiveRoom(e.detail.roomId);
      }
    };
    window.addEventListener(SERVER_SYNC_STATUS_EVENT, handleSyncStatus);
    return () => {
      cleanup();
      window.removeEventListener(SERVER_SYNC_STATUS_EVENT, handleSyncStatus);
    };
  }, []);

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const handleTabChange = (tab: 'phases' | 'characters' | 'synopsis' | 'notebook') => {
    setPlayerTab(tab);
    playPageFlipSound();
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
    if (confirm('기본 시나리오(탐정금지구역)로 초기화하시겠습니까?')) {
      localStorage.removeItem('boardbang_custom_scenario');
      setScenario(defaultScenario);
      alert('기본 시나리오로 복원되었습니다.');
    }
  };

  return (
    <div className="min-h-screen text-[#e8dfcc] font-serif flex flex-col selection:bg-[#8b261e] selection:text-[#fbf9f5] relative overflow-x-hidden">
      {/* Ambient Gaslamp Glow in corners */}
      <div className="fixed top-0 left-0 w-64 h-64 bg-radial from-[#d4af37]/10 via-[#d4af37]/2 to-transparent pointer-events-none z-0 animate-lamp-flicker" />
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-radial from-[#800f13]/15 via-[#800f13]/3 to-transparent pointer-events-none z-0 animate-pulse" />

      {/* GLOBAL HEADER BAR - Vintage Newspaper Masthead Style */}
      <header className="border-b border-[#b48c36]/40 bg-[#161210]/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <button
            onClick={() => {
              setCurrentView('cover');
              playPageFlipSound();
            }}
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity text-left cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-sm bg-[#8b261e] border border-[#b48c36] flex items-center justify-center text-[#f5ede1] font-bold text-xs shadow-md group-hover:scale-105 transition-transform">
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
            {/* Real-time Multi-device Sync Badge & Button */}
            <button
              onClick={() => {
                setIsRoomModalOpen(true);
                playBrassChime();
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] transition-all active:scale-95 cursor-pointer shadow-xs ${
                syncStatus.connected
                  ? 'bg-[#142316] border-emerald-600/70 text-emerald-300 hover:bg-[#1d3320]'
                  : 'bg-[#291e14] border-amber-700/60 text-amber-300 hover:bg-[#38281b]'
              }`}
              title="클릭하여 모바일 실시간 연동 설정 및 스마트폰 초대 링크를 확인합니다."
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  syncStatus.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className="font-sans font-medium flex items-center gap-1">
                {syncStatus.connected ? (
                  <>
                    <span className="hidden sm:inline">
                      실시간 연동 ({activeRoom === DEFAULT_ROOM_ID ? '기본방' : activeRoom})
                    </span>
                    <span className="sm:hidden">
                      연동 ({activeRoom === DEFAULT_ROOM_ID ? '기본방' : activeRoom})
                    </span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">연결 설정 (터치)</span>
                    <span className="sm:hidden">연결 설정</span>
                  </>
                )}
              </span>
              <Radio className="w-3 h-3 opacity-70 ml-0.5" />
            </button>

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
                onClick={() => {
                  setCurrentView('player');
                  playPageFlipSound();
                }}
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
                className="px-3 py-1.5 bg-[#8b261e] hover:bg-[#a31621] border border-[#b48c36] text-[#f5ede1] text-xs font-bold rounded-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5 hover:scale-105"
              >
                <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>GM 입장</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-6 z-10">
        {/* ========================================================
            1. COVER VIEW (첫 화면: 1931년 경성일보 호외 1면)
           ======================================================== */}
        {currentView === 'cover' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Vintage Newspaper Extra Front Page Banner with Drop Animation */}
            <div
              className="p-6 sm:p-10 bg-[#f7f2e7] text-[#1c1917] border-4 double border-[#2b241e] shadow-2xl relative animate-newspaper-drop"
              style={{
                boxShadow: '0 10px 40px rgba(0,0,0,0.8), inset 0 0 50px rgba(0,0,0,0.06)',
              }}
            >
              {/* Corner Art Deco Accents */}
              <div className="absolute top-2 left-2 text-[10px] text-[#7a6a5d] font-deco">
                VOL. 1931 · NO. 1104
              </div>
              <div className="absolute top-2 right-2 stamp-seal px-2.5 py-0.5 text-xs animate-stamp-slam">
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
                <div className="inline-block px-3 py-1 bg-[#800f13] text-[#f5ede1] font-bold text-xs tracking-wider mb-3 rounded-none uppercase shadow-sm">
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
                    다이쇼 초기 제도 가와즈야 저택 연쇄살인 수사본부
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

              {/* Navigation Tabs (4 Tabs) */}
              <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-semibold">
                <button
                  onClick={() => handleTabChange('phases')}
                  className={`px-3.5 py-1.5 rounded-sm border transition-all flex items-center gap-1.5 cursor-pointer ${
                    playerTab === 'phases'
                      ? 'border-[#b48c36] bg-[#8b261e] text-[#f5ede1] font-bold shadow-md'
                      : 'border-[#5a483a] bg-[#140f0c] text-[#a89988] hover:text-[#f5ede1]'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-[#d4af37]" />
                  <span>단계별 스토리 & 진행 (14단계)</span>
                </button>

                <button
                  onClick={() => handleTabChange('characters')}
                  className={`px-3.5 py-1.5 rounded-sm border transition-all flex items-center gap-1.5 cursor-pointer ${
                    playerTab === 'characters'
                      ? 'border-[#b48c36] bg-[#8b261e] text-[#f5ede1] font-bold shadow-md'
                      : 'border-[#5a483a] bg-[#140f0c] text-[#a89988] hover:text-[#f5ede1]'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>6인의 용의자 & 밀서 ({scenario.characters.length}명)</span>
                </button>

                <button
                  onClick={() => handleTabChange('synopsis')}
                  className={`px-3.5 py-1.5 rounded-sm border transition-all flex items-center gap-1.5 cursor-pointer ${
                    playerTab === 'synopsis'
                      ? 'border-[#b48c36] bg-[#8b261e] text-[#f5ede1] font-bold shadow-md'
                      : 'border-[#5a483a] bg-[#140f0c] text-[#a89988] hover:text-[#f5ede1]'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>사건 개요 & 피해자</span>
                </button>

                <button
                  onClick={() => handleTabChange('notebook')}
                  className={`px-3.5 py-1.5 rounded-sm border transition-all flex items-center gap-1.5 cursor-pointer ${
                    playerTab === 'notebook'
                      ? 'border-[#b48c36] bg-[#8b261e] text-[#f5ede1] font-bold shadow-md'
                      : 'border-[#5a483a] bg-[#140f0c] text-[#a89988] hover:text-[#f5ede1]'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span>탐정 수사 메모 & 판별</span>
                </button>
              </div>
            </div>

            {/* TAB 1: 14 PHASES STORYBOOK */}
            {playerTab === 'phases' && (
              <div className="space-y-4">
                <PhaseStoryBook
                  currentPhaseIndex={currentPhaseIndex}
                  onSelectPhase={(idx) => setCurrentPhaseIndex(idx)}
                />
              </div>
            )}

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
                  <div className="p-5 bg-[#231816] border border-[#9b2226]/50 rounded-sm space-y-3 shadow-md hover:border-[#e63946] transition-colors">
                    <div className="flex items-center justify-between border-b border-[#9b2226]/30 pb-2">
                      <div className="flex items-center gap-2 text-[#e63946]">
                        <AlertTriangle className="w-4 h-4" />
                        <h4 className="font-bold text-sm font-title text-[#f5ede1]">
                          피해자 감식 보고서
                        </h4>
                      </div>
                      <span className="text-[11px] px-2 py-0.5 border border-[#9b2226] text-[#ff8fa3] bg-[#9b2226]/20 font-bold">
                        피살 확인 (오전 0시)
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <div className="shrink-0">
                        <CharacterSilhouette type="frog" size={68} />
                      </div>
                      <div className="space-y-1.5 text-xs text-[#d8c8b4] font-sans flex-1">
                        <div>
                          <strong className="text-[#f5ede1]">성명 / 연령:</strong>{' '}
                          {scenario.victim.name} ({scenario.victim.age}세)
                        </div>
                        <div>
                          <strong className="text-[#f5ede1]">직함 / 신분:</strong>{' '}
                          {scenario.victim.title || scenario.victim.description}
                        </div>
                        <div>
                          <strong className="text-[#d4af37]">특징:</strong>{' '}
                          개구리 가면으로 정체를 숨긴 제도의 명탐정. 연쇄 살인마 까마귀의 숙적.
                        </div>
                        <div>
                          <strong className="text-[#e63946]">직접 사인:</strong>{' '}
                          {scenario.victim.causeOfDeath}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Crime Scene Dossier */}
                  <div className="p-5 bg-[#1b1714] border border-[#b48c36]/40 rounded-sm space-y-3 shadow-md">
                    <div className="flex items-center justify-between border-b border-[#3d3128] pb-2">
                      <div className="flex items-center gap-2 text-[#d4af37]">
                        <Compass className="w-4 h-4" />
                        <h4 className="font-bold text-sm font-title text-[#f5ede1]">
                          사건 현장 (가와즈야 저택 2층 서재)
                        </h4>
                      </div>
                      <span className="text-[11px] px-2 py-0.5 border border-[#b48c36] text-[#d4af37] bg-[#27201b] font-bold">
                        현장 보존
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-[#d8c8b4] font-sans">
                      <div>
                        <strong className="text-[#f5ede1]">발견 장소:</strong>{' '}
                        {scenario.victim.crimeScene}
                      </div>
                      <div>
                        <strong className="text-[#d4af37]">발견 경위:</strong>{' '}
                        오전 0시, 서재 앞 복도에서 작가가 주저앉아 비명을 지름. 서재 문은 열려 있었고, 안락의자에 가슴에 나이프가 꽂힌 가와즈야가 앉아 있었음.
                      </div>
                      <div>
                        <strong className="text-[#b48c36]">저택 구조:</strong>{' '}
                        1층 응접실(축음기 및 편지 상자 보관)과 안쪽 자료실(K·R·M 사건 파일), 2층 손님용 침실과 탐정의 서재.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Clues Gallery (Click to Inspect) */}
                <div className="p-5 bg-[#1a1411] border border-[#b48c36]/50 rounded-sm space-y-3 shadow-lg">
                  <div className="flex items-center justify-between border-b border-[#3d3128] pb-2">
                    <div className="flex items-center gap-2 text-[#d4af37]">
                      <Search className="w-4 h-4" />
                      <h4 className="font-bold text-sm font-title text-[#f5ede1]">
                        현장 압수 증거물 정밀 감식 (클릭하여 확대경 검사)
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#a89988]">
                      단서 4종 감식 완료
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                    {CRIME_SCENE_CLUES.map((clue) => (
                      <button
                        key={clue.id}
                        onClick={() => {
                          setSelectedClue(clue);
                          playStampSlamSound();
                        }}
                        className="p-3 bg-[#231b16] border border-[#44362b] hover:border-[#d4af37] text-left rounded-sm transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer flex items-start gap-3 group"
                      >
                        <div className="w-10 h-10 rounded bg-[#140f0c] border border-[#b48c36]/40 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                          {clue.icon}
                        </div>
                        <div className="flex-1 min-w-0 text-xs">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="font-bold text-[#f5ede1] truncate group-hover:text-[#d4af37] transition-colors">
                              {clue.name}
                            </span>
                            <span className="text-[10px] text-[#a89988] shrink-0 border border-[#44362b] px-1 rounded-none">
                              {clue.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#b8a995] line-clamp-1">
                            {clue.description}
                          </p>
                          <div className="mt-1 text-[10px] text-[#d4af37] flex items-center gap-1 font-serif">
                            <Search className="w-3 h-3" />
                            <span>상세 감식 소견 보기 ➔</span>
                          </div>
                        </div>
                      </button>
                    ))}
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
                            <div className="flex items-center gap-1.5 flex-wrap">
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

                            {/* Role Title & Badges */}
                            <div className="flex items-center gap-1.5 flex-wrap mt-1">
                              {char.roleTitle && (
                                <span className="text-xs font-bold text-[#f5ede1] bg-[#8b261e]/50 border border-[#b48c36]/40 px-1.5 py-0.2">
                                  {char.roleTitle}
                                </span>
                              )}
                              {char.groupName && (
                                <span className={`text-[11px] px-1.5 py-0.2 font-serif border ${
                                  char.group === 'carriage'
                                    ? 'bg-[#3d261e] border-[#b48c36] text-[#e2c7a4]'
                                    : 'bg-[#1b2838] border-[#457b9d] text-[#a8dadc]'
                                }`}>
                                  {char.groupName}
                                </span>
                              )}
                              {char.interviewTime && (
                                <span className="text-[11px] text-[#d4af37] bg-[#140f0c] border border-[#5a483a] px-1.5 py-0.2 font-mono">
                                  면담: {char.interviewTime}
                                </span>
                              )}
                              {char.hasSharpObjective && (
                                <span className="text-[10px] text-[#ffccd5] bg-[#9b2226]/40 border border-[#9b2226] px-1 py-0.2 font-serif">
                                  #표 목적 보유
                                </span>
                              )}
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
                            <span>공개 정보 (인상착의, 이동 경로, 당일 행적, 소지품)</span>
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
                        <div className="p-3 bg-[#241c18] border-t border-[#b48c36]/30 flex flex-wrap items-center justify-between gap-2">
                          <div className="text-[11px] text-[#a89988] font-mono">
                            {char.passwordHint || '역할 비밀번호 필요'}
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

      {/* CLUE INSPECTION MODAL */}
      {selectedClue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div
            className="relative w-full max-w-md bg-[#1d1612] border-2 border-[#b48c36] p-5 sm:p-6 rounded-sm shadow-2xl animate-newspaper-drop font-serif"
            style={{
              boxShadow: '0 0 40px rgba(0,0,0,0.9), inset 0 0 50px rgba(180, 140, 54, 0.1)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#b48c36]/40">
              <div className="flex items-center gap-2">
                <span className="text-2xl p-1 bg-[#120f0c] border border-[#b48c36]/40 rounded">
                  {selectedClue.icon}
                </span>
                <div>
                  <span className="text-[10px] text-[#d4af37] tracking-wider uppercase font-sans">
                    압수 증거물 번호 #{selectedClue.id.replace('clue_', '').toUpperCase()}
                  </span>
                  <h4 className="font-bold text-base text-[#f5ede1] font-title">
                    {selectedClue.name}
                  </h4>
                </div>
              </div>

              <button
                onClick={() => setSelectedClue(null)}
                className="text-[#a89988] hover:text-[#f5ede1] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Clue Details */}
            <div className="space-y-3 text-xs text-[#d8c8b4] font-sans">
              <div className="p-2.5 bg-[#140f0c] border border-[#3d3128] rounded-sm">
                <span className="text-[#a89988] block text-[11px] mb-0.5 font-serif">
                  【발견 장소】
                </span>
                <span className="text-[#f5ede1] font-bold">
                  {selectedClue.foundLocation}
                </span>
              </div>

              <div>
                <span className="text-[#a89988] block text-[11px] mb-0.5 font-serif">
                  【외관 특징】
                </span>
                <p className="leading-relaxed bg-[#241c17] p-2.5 border border-[#44362b] rounded-sm text-[#e8dfcc]">
                  {selectedClue.description}
                </p>
              </div>

              <div className="p-3 bg-[#2a1215] border border-[#9b2226]/60 rounded-sm">
                <span className="text-[#ff8fa3] block text-[11px] mb-1 font-bold font-serif flex items-center gap-1">
                  <Search className="w-3.5 h-3.5" />
                  <span>탐정 및 감식반의 정밀 소견</span>
                </span>
                <p className="leading-relaxed text-[#fcd5ce]">
                  {selectedClue.forensicNote}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#3d3128] flex justify-end">
              <button
                onClick={() => setSelectedClue(null)}
                className="px-4 py-1.5 bg-[#8b261e] border border-[#b48c36] text-xs font-bold text-[#f5ede1] hover:brightness-110 cursor-pointer"
              >
                확인 및 닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECRET DOSSIER MODAL */}
      {selectedCharForSecret && (
        <SecretDossierModal
          character={selectedCharForSecret}
          isOpen={!!selectedCharForSecret}
          onClose={() => setSelectedCharForSecret(null)}
        />
      )}

      {/* REAL-TIME ROOM SYNC MODAL */}
      <RoomSyncModal
        isOpen={isRoomModalOpen}
        onClose={() => setIsRoomModalOpen(false)}
      />
    </div>
  );
}
