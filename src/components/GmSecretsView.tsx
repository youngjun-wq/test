import React, { useState, useEffect } from 'react';
import { CharacterData } from '../types/scenario';
import { decryptAESGCM } from '../utils/crypto';
import { CharacterSilhouette } from './CharacterSilhouette';
import { KeyRound, ShieldAlert, Check, Copy, ChevronDown, ChevronUp, Lock } from 'lucide-react';

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
            GM 마스터 브리핑 : 사건의 전모 & 핵심 갈등 구조
          </h4>
        </div>
        <div className="text-xs text-[#d8c8b4] space-y-1.5 leading-relaxed font-sans">
          <p>
            • <strong className="text-[#d4af37]">피해자:</strong> 배상호 (사채업자이자 친일 골동품상, 여동생 원수, 구락부 압류 위협, 독립운동 명부 탈취범)
          </p>
          <p>
            • <strong className="text-[#d4af37]">밀실 트릭:</strong> 지배인 민우현이 시신을 발견 후 구락부 파산을 막기 위해 <strong>특수 철사</strong>로 안쪽 걸쇠를 채워 밀실 조작.
          </p>
          <p>
            • <strong className="text-[#d4af37]">흉기와 독극물:</strong> 한의사 송백화가 독살을 기도(독약 투여). 그러나 여가수 강채령이 와인병으로 가격 후 탈출, 또 다른 자가 송백화 가방에서 훔친 은장도로 가슴을 찔러 치명상을 입힘.
          </p>
          <p>
            • <strong className="text-[#d4af37]">특무 수사관:</strong> 고바야시 켄지는 총독부 형사(사토 켄이치)로 사라진 황실 어보 추적 중.
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
                  <div className="w-10 h-12 overflow-hidden shrink-0 border border-[#b48c36]/40">
                    <CharacterSilhouette type={char.avatarIcon} size={40} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-[#f5ede1] font-title">
                        {char.name} {char.hanchaName ? `(${char.hanchaName})` : ''}
                      </span>
                      <span className="text-xs text-[#a89988]">
                        {char.occupation} · {char.age}세
                      </span>
                    </div>
                    {char.passwordHint && (
                      <div className="text-[11px] text-[#d4af37] flex items-center gap-1 mt-0.5">
                        <KeyRound className="w-3 h-3 text-[#d4af37]" />
                        <span>플레이어 역할 암호: {char.passwordHint.replace('비밀번호:', '').trim()}</span>
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
                    <div className="p-4 bg-[#f6f1e5] text-[#1c1917] rounded-sm text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-wrap shadow-inner border border-[#b48c36]/40">
                      {secret}
                    </div>
                  ) : error ? (
                    <div className="p-3 bg-[#9b2226]/20 border border-[#9b2226] text-xs text-[#ff8fa3]">
                      {error}
                    </div>
                  ) : (
                    <div className="text-xs text-[#a89988]">복호화 계산 중...</div>
                  )}

                  {/* Public testimony reminder for GM */}
                  <div className="mt-3 p-3 bg-[#1e1814] border border-[#3d3128] text-xs text-[#a89988] font-sans">
                    <strong className="text-[#d4af37]">공개된 증언:</strong> "{char.publicInfo.testimony}"
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
