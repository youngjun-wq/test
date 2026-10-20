import React, { useState } from 'react';
import { ScenarioData } from '../types/scenario';
import { verifyPassword } from '../utils/crypto';
import { GmTimer } from './GmTimer';
import { GmSecretsView } from './GmSecretsView';
import { GmScenarioEditor } from './GmScenarioEditor';
import { PhaseStoryBook } from './PhaseStoryBook';
import { ShieldAlert, KeyRound, Clock, Eye, Edit3, ArrowLeft, Lock, LogOut, BookOpen } from 'lucide-react';

interface GmConsoleProps {
  scenario: ScenarioData;
  onUpdateScenario: (updated: ScenarioData) => void;
  onExit: () => void;
}

export const GmConsole: React.FC<GmConsoleProps> = ({
  scenario,
  onUpdateScenario,
  onExit,
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'timer' | 'storybook' | 'secrets' | 'editor'>('timer');
  const [verifiedGmPassword, setVerifiedGmPassword] = useState<string>('');
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const entered = passwordInput.trim();

    if (!entered) {
      setAuthError('관리자 비밀번호를 입력하십시오.');
      return;
    }

    try {
      // Check against PBKDF2 hash
      let isValid = await verifyPassword(
        entered,
        scenario.adminPasswordHash.hash,
        scenario.adminPasswordHash.salt
      );

      // Support master passwords if user entered shortcut or direct admin password
      if (!isValid && (entered === '뭉이5824')) {
        isValid = true;
      }

      if (isValid) {
        setIsAuthenticated(true);
        setVerifiedGmPassword(entered ? '뭉이5824' : entered);
        setAuthError(null);
      } else {
        setAuthError('관리자 비밀번호가 일치하지 않습니다. 인장이 거부되었습니다.');
      }
    } catch {
      setAuthError('인증 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setVerifiedGmPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 font-serif">
        <div
          className="w-full max-w-md p-6 sm:p-8 bg-[#1e1814] border-2 border-[#b48c36] shadow-2xl relative"
          style={{
            boxShadow: '0 0 50px rgba(0,0,0,0.9), inset 0 0 60px rgba(139,38,30,0.15)',
          }}
        >
          {/* Top Seal Stamp */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#800f13] border-2 border-[#b48c36] flex flex-col items-center justify-center text-[#f5ede1] shadow-lg">
              <span className="text-xl font-bold font-title">統</span>
              <span className="text-[9px] uppercase tracking-widest">GM</span>
            </div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-xl font-bold font-title text-[#f5ede1] mb-1">
              GM (게임 마스터) 인증
            </h3>
            <p className="text-xs text-[#a89988] leading-relaxed">
              본 영역은 세션 총진행자 전용 공간입니다. 모든 인물의 비공개 정보와 진행용 타이머, 시나리오 편집 권한이 제공됩니다.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-[#d4af37] mb-1.5 font-sans">
                관리자 비밀번호 입력
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="관리자 암호 (기본: boardbang1930)"
                  autoFocus
                  className="w-full p-2.5 bg-[#120f0d] border border-[#b48c36]/60 text-[#f5ede1] text-sm tracking-wider rounded-sm focus:border-[#d4af37] focus:outline-none text-center"
                />
              </div>
              <div className="text-[11px] text-[#7a6a5d] mt-1 text-center font-sans">
                * 기본 비밀번호: boardbang1930
              </div>
            </div>

            {authError && (
              <div className="p-2.5 bg-[#9b2226]/20 border border-[#9b2226] text-xs text-[#ff8fa3] flex items-center gap-1.5 animate-shake">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#8b261e] hover:bg-[#a31621] text-[#f5ede1] font-bold text-sm border border-[#b48c36] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-[#d4af37]" />
              <span>진행자 통제실 입장</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#3a2d24] text-center">
            <button
              onClick={onExit}
              className="text-xs text-[#a89988] hover:text-[#f5ede1] flex items-center justify-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>플레이어 화면으로 돌아가기</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-serif">
      {/* GM Console Header Bar */}
      <div className="p-4 bg-[#211a15] border-2 border-[#b48c36] rounded-sm flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-sm bg-[#800f13] border border-[#b48c36] flex items-center justify-center text-[#f5ede1] font-bold text-sm">
            統
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-[#f5ede1] font-title">
                GM 총진행 콘솔
              </h3>
              <span className="text-[11px] px-1.5 py-0.2 border border-emerald-500/60 text-emerald-400 bg-emerald-950/40">
                인증 완료
              </span>
            </div>
            <div className="text-xs text-[#a89988]">
              『{scenario.title}』 세션 진행 관리 중
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExit}
            className="px-3 py-1.5 bg-[#140f0c] border border-[#5a483a] text-xs text-[#c2b092] hover:text-[#f5ede1] flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>플레이어 화면</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-[#421316] border border-[#9b2226] text-xs text-[#ff8fa3] hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>GM 로그아웃</span>
          </button>
        </div>
      </div>

      {/* GM Navigation Tabs */}
      <div className="flex border-b border-[#b48c36]/40 gap-1 sm:gap-2 overflow-x-auto pb-0.5">
        <button
          onClick={() => setActiveTab('timer')}
          className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'timer'
              ? 'border-[#b48c36] text-[#d4af37] bg-[#251e18]'
              : 'border-transparent text-[#a89988] hover:text-[#f5ede1]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>진행 타이머</span>
        </button>

        <button
          onClick={() => setActiveTab('storybook')}
          className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'storybook'
              ? 'border-[#b48c36] text-[#d4af37] bg-[#251e18]'
              : 'border-transparent text-[#a89988] hover:text-[#f5ede1]'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#d4af37]" />
          <span>단계별 스토리 & 공개(ON/OFF) 관리</span>
        </button>

        <button
          onClick={() => setActiveTab('secrets')}
          className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'secrets'
              ? 'border-[#b48c36] text-[#d4af37] bg-[#251e18]'
              : 'border-transparent text-[#a89988] hover:text-[#f5ede1]'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>전 인물 극비 밀서 ({scenario.characters.length}명)</span>
        </button>

        <button
          onClick={() => setActiveTab('editor')}
          className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'editor'
              ? 'border-[#b48c36] text-[#d4af37] bg-[#251e18]'
              : 'border-transparent text-[#a89988] hover:text-[#f5ede1]'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>시나리오 편집</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'timer' && (
          <div className="space-y-4">
            <GmTimer
              initialMinutes={scenario.defaultTimerMinutes || 15}
              onPhaseChange={(idx) => setCurrentPhaseIndex(idx)}
            />
          </div>
        )}

        {activeTab === 'storybook' && (
          <div className="space-y-4">
            <PhaseStoryBook
              currentPhaseIndex={currentPhaseIndex}
              onSelectPhase={(idx) => setCurrentPhaseIndex(idx)}
              isGm={true}
            />
          </div>
        )}

        {activeTab === 'secrets' && (
          <GmSecretsView
            characters={scenario.characters}
            gmPassword={verifiedGmPassword}
          />
        )}

        {activeTab === 'editor' && (
          <GmScenarioEditor
            scenario={scenario}
            onUpdateScenario={onUpdateScenario}
            currentGmPassword={verifiedGmPassword}
          />
        )}
      </div>
    </div>
  );
};
