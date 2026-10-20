import React, { useState, useEffect } from 'react';
import { CharacterData } from '../types/scenario';
import { decryptAESGCM } from '../utils/crypto';
import { CharacterSilhouette } from './CharacterSilhouette';
import { KeyRound, ShieldAlert, Check, Copy, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { MarkdownViewer } from './MarkdownViewer';

interface GmSecretsViewProps {
  characters: CharacterData[];
  gmPassword: string;
}

export const GmSecretsView: React.FC<GmSecretsViewProps> = ({ characters, gmPassword }) => {
  const [decryptedMap, setDecryptedMap] = useState<Record<string, string>>({});
  const [errorMap, setErrorMap] = useState<Record<string, string>>({});
  const [expandedId, setExpandedId] = useState<string | null>(characters[0]?.id || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Decrypt all character secrets for GM using gmPassword
  useEffect(() => {
    let isMounted = true;

    async function decryptAll() {
      const results: Record<string, string> = {};
      const errors: Record<string, string> = {};

      for (const char of characters) {
        try {
          const decrypted = await decryptAESGCM(char.encryptedSecretForGm, gmPassword);
          results[char.id] = decrypted;
        } catch {
          errors[char.id] = '밀서 복호화 실패 (GM 암호 불일치)';
        }
      }

      if (isMounted) {
        setDecryptedMap(results);
        setErrorMap(errors);
      }
    }

    if (gmPassword) {
      decryptAll();
    }

    return () => {
      isMounted = false;
    };
  }, [characters, gmPassword]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4 font-serif">
      {/* GM Summary Briefing */}
      <div className="p-4 bg-[#231816] border border-[#9b2226]/50 rounded-sm">
        <div className="flex items-center gap-2 mb-2 text-[#e63946]">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <h4 className="font-bold text-sm font-title text-[#f5ede1]">
            GM 마스터 브리핑 : [탐정금지구역] 6인 수사 구조 & 핵심 단서
          </h4>
        </div>
        <div className="text-xs text-[#d8c8b4] space-y-1.5 leading-relaxed font-sans">
          <p>
            • <strong className="text-[#d4af37]">피해자:</strong> 개구리 가면의 명탐정 가와즈야 세이지로 (경찰 수사 고문, 흉악범죄 예언서를 남기고 서재 안락의자에서 나이프에 찔려 피살).
          </p>
          <p>
            • <strong className="text-[#d4af37]">조 편성 (1장):</strong> 마차조 (베테랑 형사, 미모의 괴도, 청소부) / 기차조 (작가, 전직 기자, 조수).
          </p>
          <p>
            • <strong className="text-[#d4af37]">면담 순서 (막간②):</strong> 6:00 괴도 → 6:30 형사 → 7:00 조수 → 7:30 전직 기자 → 8:00 작가 → 8:30 청소부.
          </p>
          <p>
            • <strong className="text-[#d4af37]">사건 단서 메모:</strong> K (까마귀 사건) / R (후시미 리쓰코 사건) / M (오오기 마리코 사건).
          </p>
          <p>
            • <strong className="text-[#d4af37]">비밀 상자 & 작은 열쇠:</strong> 막간③ 이후 「작은 열쇠」 카드를 가진 플레이어가 상자를 열겠다고 선언하면 전원 편지 및 최종 목적 공개!
          </p>
          <p>
            • <strong className="text-[#d4af37]">최종 추리 특수 역할:</strong> 전직 기자 & 청소부의 [#표 목적], 작가의 구두 추리(3-A 또는 3-B) 발표 후 일제 지목 투표.
          </p>
        </div>
      </div>

      {/* Suspect Accordions */}
      <div className="space-y-3">
        {characters.map((char) => {
          const secret = decryptedMap[char.id];
          const error = errorMap[char.id];
          const isExpanded = expandedId === char.id;

          return (
            <div
              key={char.id}
              className="border border-[#b48c36]/40 bg-[#1a1512] rounded-sm overflow-hidden transition-all shadow-md"
            >
              {/* Header Strip */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : char.id)}
                className="w-full p-3 sm:p-4 flex items-center justify-between text-left hover:bg-[#241c18] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-14 overflow-hidden shrink-0 border border-[#b48c36]/60 rounded-sm shadow-sm bg-[#171310]">
                    <CharacterSilhouette
                      type={char.avatarIcon}
                      imageUrl={char.imageUrl}
                      altName={char.name}
                      size={44}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-base text-[#f5ede1] font-title">
                        {char.name} {char.hanchaName ? `(${char.hanchaName})` : ''}
                      </span>
                      {char.playerName && (
                        <span className="text-xs font-bold text-[#f5ede1] bg-[#800f13] border border-[#b48c36] px-2 py-0.5 rounded-sm font-serif shadow-sm">
                          플레이어: {char.playerName}
                        </span>
                      )}
                      <span className="text-xs text-[#a89988]">
                        {char.occupation} · {char.age}세
                      </span>
                    </div>
                    {char.passwordHint && (
                      <div className="text-[11px] text-[#d4af37] flex items-center gap-1 mt-0.5">
                        <KeyRound className="w-3 h-3 text-[#d4af37]" />
                        <span>
                          {char.playerName ? `[${char.playerName} 전용 암호] ` : '플레이어 역할 암호: '}
                          {char.passwordHint.replace('비밀번호:', '').trim()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#a89988]">
                  <span className="hidden sm:inline">
                    {isExpanded ? '접기' : '밀서 보기'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Expanded Dossier Content */}
              {isExpanded && (
                <div className="p-4 sm:p-5 border-t border-[#b48c36]/20 bg-[#161210] animate-fade-in">
                  <div className="flex items-center justify-between mb-3 text-xs border-b border-[#3d3128] pb-2">
                    <div className="flex items-center gap-2 text-[#d4af37]">
                      <Lock className="w-3.5 h-3.5" />
                      <span className="font-bold">극비 비공개 정보 (GM 권한 복호화 완료)</span>
                    </div>
                    {secret && (
                      <button
                        onClick={() => handleCopy(char.id, secret)}
                        className="flex items-center gap-1 text-[11px] px-2 py-1 bg-[#251e18] border border-[#b48c36]/40 text-[#c2b092] hover:text-[#f5ede1]"
                      >
                        {copiedId === char.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === char.id ? '복사됨' : '본문 복사'}</span>
                      </button>
                    )}
                  </div>

                  {secret ? (
                    <div className="p-4 bg-[#f6f1e5] text-[#1c1917] rounded-sm text-xs sm:text-sm font-sans leading-relaxed shadow-inner border border-[#b48c36]/40">
                      <MarkdownViewer content={secret} />
                    </div>
                  ) : error ? (
                    <div className="p-3 bg-[#9b2226]/20 border border-[#9b2226] text-xs text-[#ff8fa3]">
                      {error}
                    </div>
                  ) : (
                    <div className="text-xs text-[#a89988]">복호화 계산 중...</div>
                  )}

                  {/* Public info reminder for GM */}
                  <div className="mt-3 p-3 bg-[#1e1814] border border-[#3d3128] text-xs text-[#a89988] font-sans">
                    {char.publicInfo.testimony ? (
                      <div>
                        <strong className="text-[#d4af37]">공개된 증언:</strong> "{char.publicInfo.testimony}"
                      </div>
                    ) : char.publicInfo.text ? (
                      <div>
                        <strong className="text-[#d4af37]">공개 정보:</strong> {char.publicInfo.text}
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
