import React, { useState, useEffect } from 'react';
import { CharacterData } from '../types/scenario';
import { decryptAESGCM } from '../utils/crypto';
import { playSealBreakSound, playTypewriterJamSound } from '../utils/sound';
import { Lock, Eye, EyeOff, ShieldAlert, X, Copy, Check, Sparkles } from 'lucide-react';
import { MarkdownViewer } from './MarkdownViewer';
import { CharacterSilhouette } from './CharacterSilhouette';

interface SecretDossierModalProps {
  character: CharacterData;
  isOpen: boolean;
  onClose: () => void;
}

export const SecretDossierModal: React.FC<SecretDossierModalProps> = ({ character, isOpen, onClose }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [decryptedSecret, setDecryptedSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCrackingSeal, setIsCrackingSeal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Security: Auto-seal when window/tab blurs or phone screen turns off
  useEffect(() => {
    const handleBlur = () => {
      if (decryptedSecret) {
        // Automatically close to prevent eavesdropping by nearby players
        setDecryptedSecret(null);
        setIsCrackingSeal(false);
        setPasswordInput('');
        setErrorMessage('주변 시선 보호를 위해 화면 전환 시 밀서가 자동으로 재봉인되었습니다.');
      }
    };
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [decryptedSecret]);

  if (!isOpen) return null;

  const handleUnlock = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!passwordInput.trim()) {
      setErrorMessage('밀서를 해제할 암호를 입력하여 주십시오.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const entered = passwordInput.trim();

    try {
      // First attempt with primary encryptedSecret
      let secret: string;
      try {
        secret = await decryptAESGCM(character.encryptedSecret, entered);
      } catch (err) {
        // If alternate encrypted secret exists (numeric fallback), attempt with it
        if (character.encryptedSecretAlt) {
          try {
            secret = await decryptAESGCM(character.encryptedSecretAlt, entered);
          } catch {
            throw err;
          }
        } else {
          throw err;
        }
      }

      // Trigger seal crack animation
      setIsCrackingSeal(true);
      playSealBreakSound();

      setTimeout(() => {
        setDecryptedSecret(secret);
        setIsCrackingSeal(false);
        setErrorMessage(null);
        setIsLoading(false);
      }, 550);
    } catch {
      playTypewriterJamSound();
      const phrases = [
        '붉은 인주가 굳어 서신이 열리지 않습니다. 암호가 일치하지 않습니다.',
        '밀서의 봉인이 해제되지 않습니다. 전달받은 암호 문구를 다시 점검하십시오.',
        '경성 헌병대의 검열 인장이 찍히지 않은 위조 암호입니다. 암호를 재확인하십시오.',
      ];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setErrorMessage(randomPhrase);
      setIsLoading(false);
    }
  };

  const handleSealAgain = () => {
    playSealBreakSound();
    setDecryptedSecret(null);
    setPasswordInput('');
    setErrorMessage(null);
    onClose();
  };

  const handleCopySecret = () => {
    if (!decryptedSecret) return;
    navigator.clipboard.writeText(decryptedSecret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-sm border-2 border-[#b48c36] bg-[#1a1512] shadow-2xl overflow-hidden"
        style={{
          boxShadow: '0 0 40px rgba(0,0,0,0.8), inset 0 0 60px rgba(139,38,30,0.15)',
        }}
      >
        {/* Top Header Strip with Art Deco Motifs */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#241c18] border-b border-[#b48c36]/40 text-[#f5ede1]">
          <div className="flex items-center gap-2">
            <span className="text-xs px-1.5 py-0.5 border border-[#9b2226] bg-[#9b2226]/20 text-[#e63946] font-bold tracking-wider font-serif">
              極秘 封印
            </span>
            <span className="text-sm font-semibold tracking-wide text-[#d4af37]">
              {character.playerName ? `${character.playerName} 님 (${character.name}) 극비 서신` : `${character.name} 귀하의 밀서`}
            </span>
          </div>

          <button
            onClick={handleSealAgain}
            className="p-1 text-[#c2b092] hover:text-white transition-colors"
            title="닫기 및 봉인"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-[#e8dfcc]">
          {!decryptedSecret ? (
            /* SEALED STATE */
            <div className="flex flex-col items-center text-center py-2">
              {/* Character Portrait & Player Badge */}
              <div className="flex flex-col items-center mb-2">
                <div className="w-20 h-25 rounded-sm overflow-hidden border-2 border-[#b48c36] shadow-xl relative bg-[#171310]">
                  <CharacterSilhouette
                    type={character.avatarIcon}
                    imageUrl={character.imageUrl}
                    altName={character.name}
                    size={80}
                  />
                </div>
                {character.playerName && (
                  <div className="mt-1.5 px-2.5 py-0.5 bg-[#800f13] border border-[#b48c36] text-xs font-bold text-[#f5ede1] rounded-sm font-serif shadow-sm">
                    배정 플레이어: {character.playerName}
                  </div>
                )}
              </div>

              {/* Wax Seal Graphic with Cracking Animation */}
              <div className="relative my-3 flex items-center justify-center h-24">
                {isCrackingSeal ? (
                  /* Cracking animation: split into left & right pieces with dust particles */
                  <div className="relative w-28 h-24 flex items-center justify-center">
                    <div className="absolute w-14 h-24 overflow-hidden -left-1 animate-wax-crack-left">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#800f13] via-[#a31621] to-[#470d10] border-2 border-[#b48c36]/60 flex items-center justify-center">
                        <span className="text-2xl font-bold font-serif text-[#f5ede1] drop-shadow-md ml-12">
                          封
                        </span>
                      </div>
                    </div>
                    <div className="absolute w-14 h-24 overflow-hidden -right-1 animate-wax-crack-right">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#800f13] via-[#a31621] to-[#470d10] border-2 border-[#b48c36]/60 flex items-center justify-center -ml-10">
                        <span className="text-2xl font-bold font-serif text-[#f5ede1] drop-shadow-md mr-12">
                          封
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-[#d4af37] font-bold font-serif animate-ping">
                      解 封
                    </div>
                  </div>
                ) : (
                  <div className="w-22 h-22 rounded-full bg-gradient-to-br from-[#800f13] via-[#a31621] to-[#470d10] border-2 border-[#b48c36]/60 flex items-center justify-center shadow-lg relative hover:scale-105 transition-transform">
                    <div className="w-16 h-16 rounded-full border border-dashed border-[#f5ede1]/40 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold font-serif text-[#f5ede1] drop-shadow-md">
                        封
                      </span>
                      <span className="text-[10px] text-[#f5ede1]/80 tracking-widest uppercase font-serif mt-0.5">
                        極秘
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-[#f5ede1] font-title mb-1">
                『{character.name}』 {character.playerName ? `[${character.playerName} 님]` : ''}의 극비 밀서 봉인
              </h3>
              <p className="text-xs text-[#b8a995] max-w-sm mb-4 leading-relaxed">
                이 서신에는 본 사건의 진실과 귀하만의 치명적인 비밀, 개인 승리 목표가 암호화되어 기록되어 있습니다.
              </p>

              {/* Password Hint */}
              {character.passwordHint && (
                <div className="mb-4 px-3 py-1.5 bg-[#27201b] border border-[#b48c36]/30 text-[11px] text-[#d4af37] rounded-sm font-serif">
                  <span className="opacity-70 mr-1.5">【암호 안내】</span>
                  {character.passwordHint}
                </div>
              )}

              {/* Password Form */}
              <form onSubmit={handleUnlock} className="w-full max-w-xs space-y-3">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="역할 비밀번호 입력"
                    autoFocus
                    className="w-full px-4 py-2.5 pr-10 bg-[#120f0d] border border-[#b48c36]/60 rounded-sm text-center text-sm tracking-wider text-[#f5ede1] placeholder:text-[#6a5e55] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c7e73] hover:text-[#d4af37]"
                    title={showPassword ? '암호 가리기' : '암호 보기'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {errorMessage && (
                  <div className="flex items-start gap-1.5 text-xs text-[#e63946] bg-[#9b2226]/10 border border-[#9b2226]/30 p-2 text-left animate-shake">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || isCrackingSeal}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-[#8b261e] via-[#a31621] to-[#8b261e] hover:brightness-110 active:scale-[0.99] text-[#f5ede1] font-medium text-sm border border-[#b48c36]/60 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4 text-[#d4af37]" />
                  <span>{isCrackingSeal ? '봉랍 인장 해제 중...' : isLoading ? '암호 확인 중...' : '밀서 인장 해제 (열람)'}</span>
                </button>
              </form>

              <div className="mt-4 text-[11px] text-[#8c7e73]">
                * 다른 플레이어가 엿보지 않도록 각도를 주의하십시오.
              </div>
            </div>
          ) : (
            /* DECRYPTED STATE - 3D UNROLLING PARCHMENT */
            <div className="space-y-4 animate-paper-unfold">
              {/* Top Security Banner */}
              <div className="flex items-center justify-between p-2.5 bg-[#2c1214] border border-[#9b2226] text-xs">
                <div className="flex items-center gap-2 text-[#f5ede1]">
                  <span className="w-2 h-2 rounded-full bg-[#e63946] animate-pulse" />
                  <span className="font-bold text-[#e63946] font-serif tracking-wider">[極秘 閱覽中]</span>
                  <span className="text-[#c2b092] hidden sm:inline">화면 전환 시 자동 재봉인</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopySecret}
                    className="flex items-center gap-1 text-[11px] px-2 py-1 bg-[#1a1512] border border-[#b48c36]/50 text-[#d4af37] hover:bg-[#251e18]"
                    title="밀서 복사"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '복사됨' : '복사'}</span>
                  </button>
                </div>
              </div>

              {/* Vintage Letter Document */}
              <div className="relative p-5 sm:p-6 bg-[#f7f2e7] text-[#1c1917] border-2 border-[#b48c36] shadow-inner font-serif">
                {/* Vintage Watermark & Stamp with Slam Animation */}
                <div className="absolute top-3 right-3 stamp-seal px-2 py-0.5 text-xs select-none pointer-events-none animate-stamp-slam">
                  極 秘
                </div>

                <div className="border-b border-[#2b241e]/20 pb-3 mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] tracking-widest text-[#7a6a5d] uppercase font-sans font-semibold">
                      CONFIDENTIAL DOSSIER · 探偵禁止區域 (탐정금지구역)
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <h4 className="text-xl font-bold font-title text-[#1c1917]">
                        {character.name} {character.hanchaName ? `(${character.hanchaName})` : ''} 귀하
                      </h4>
                      {character.playerName && (
                        <span className="text-xs px-2 py-0.5 bg-[#800f13] text-[#f5ede1] font-bold font-serif rounded-sm shadow-sm">
                          담당: {character.playerName}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#57483b] mt-1 font-sans">
                      직업: {character.occupation} · 나이: {character.age}세
                    </div>
                  </div>
                  {character.imageUrl && (
                    <div className="w-14 h-18 shrink-0 rounded-sm overflow-hidden border-2 border-[#b48c36] shadow-md bg-[#1a1512]">
                      <img
                        src={character.imageUrl}
                        alt={character.playerName || character.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  )}
                </div>

                {/* Secret Content with Rich Vintage Styling */}
                <div className="text-sm leading-relaxed text-[#211d1a] font-sans font-normal">
                  <MarkdownViewer content={decryptedSecret} />
                </div>

                {/* Bottom Signature / Date */}
                <div className="mt-6 pt-3 border-t border-[#2b241e]/20 flex items-center justify-between text-xs text-[#6e5d50]">
                  <span>제도 교외 가와즈야 저택 사건 수사</span>
                  <span className="font-serif italic">다이쇼 초기 어느 가을 밤</span>
                </div>
              </div>

              {/* INSTANT RE-SEAL ACTION BUTTON */}
              <div className="pt-2">
                <button
                  onClick={handleSealAgain}
                  className="w-full py-3 px-4 bg-[#7a141b] hover:bg-[#9b2226] active:scale-[0.99] text-[#f5ede1] font-semibold text-sm border-2 border-[#b48c36] shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Lock className="w-4 h-4 text-[#d4af37]" />
                  <span>밀서 즉시 다시 봉인하기 (옆 사람 시선 차단)</span>
                </button>
                <p className="text-center text-[11px] text-[#9c8e82] mt-2">
                  * 닫기를 누르면 즉시 봉인 상태로 돌아가며, 다시 보려면 암호를 재입력해야 합니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
