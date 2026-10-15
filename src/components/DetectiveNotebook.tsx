import React, { useState, useEffect } from 'react';
import { CharacterData } from '../types/scenario';
import { BookOpen, CheckCircle, HelpCircle, AlertCircle, Save, Trash2 } from 'lucide-react';

interface DetectiveNotebookProps {
  characters: CharacterData[];
  onClose?: () => void;
}

export const DetectiveNotebook: React.FC<DetectiveNotebookProps> = ({ characters, onClose }) => {
  const [suspectStatus, setSuspectStatus] = useState<Record<string, 'neutral' | 'innocent' | 'suspicious' | 'culprit'>>(() => {
    try {
      const saved = localStorage.getItem('boardbang_suspects');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [notes, setNotes] = useState<string>(() => {
    try {
      return localStorage.getItem('boardbang_notes') || '';
    } catch {
      return '';
    }
  });

  const [savedFeedback, setSavedFeedback] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('boardbang_suspects', JSON.stringify(suspectStatus));
    } catch {
      // ignore
    }
  }, [suspectStatus]);

  useEffect(() => {
    try {
      localStorage.setItem('boardbang_notes', notes);
      setSavedFeedback(true);
      const timer = setTimeout(() => setSavedFeedback(false), 1500);
      return () => clearTimeout(timer);
    } catch {
      // ignore
    }
  }, [notes]);

  const toggleStatus = (id: string) => {
    const order: Array<'neutral' | 'innocent' | 'suspicious' | 'culprit'> = ['neutral', 'suspicious', 'culprit', 'innocent'];
    const current = suspectStatus[id] || 'neutral';
    const nextIdx = (order.indexOf(current) + 1) % order.length;
    setSuspectStatus((prev) => ({ ...prev, [id]: order[nextIdx] }));
  };

  const handleClearNotes = () => {
    if (confirm('수사 메모를 모두 지우시겠습니까?')) {
      setNotes('');
      setSuspectStatus({});
    }
  };

  return (
    <div className="bg-[#1f1915] border border-[#b48c36]/40 p-4 sm:p-5 rounded-sm text-[#e8dfcc] font-serif shadow-lg">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#b48c36]/30">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#d4af37]" />
          <h3 className="font-bold text-base text-[#f5ede1] tracking-wide">
            탐정 수사 수첩 (개인 메모)
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs">
          {savedFeedback && (
            <span className="text-emerald-400 text-[11px] flex items-center gap-1">
              <Save className="w-3 h-3" /> 자동 저장됨
            </span>
          )}
          <button
            onClick={handleClearNotes}
            className="text-[#8c7e73] hover:text-[#e63946] p-1 transition-colors"
            title="수첩 초기화"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suspect Matrix Chips */}
      <div className="mb-4">
        <div className="text-xs text-[#b8a995] mb-2 flex items-center justify-between">
          <span>인물별 혐의 판단 (클릭하여 상태 변경)</span>
          <span className="text-[10px] text-[#8c7e73]">보통 ➔ 의심 ➔ 유력용의자 ➔ 결백</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {characters.map((char) => {
            const status = suspectStatus[char.id] || 'neutral';
            let badgeStyle = 'bg-[#28211b] border-[#57483b] text-[#c2b092]';
            let statusText = '판단 보류';

            if (status === 'suspicious') {
              badgeStyle = 'bg-[#5c3716]/40 border-[#b48c36] text-[#e0a842]';
              statusText = '의심스러움';
            } else if (status === 'culprit') {
              badgeStyle = 'bg-[#7a141b]/50 border-[#e63946] text-[#ff8fa3] font-bold';
              statusText = '유력 용의자';
            } else if (status === 'innocent') {
              badgeStyle = 'bg-[#183a24]/40 border-emerald-600 text-emerald-400';
              statusText = '결백 추정';
            }

            return (
              <button
                key={char.id}
                onClick={() => toggleStatus(char.id)}
                className={`p-2 rounded-sm border text-left text-xs transition-all flex flex-col justify-between cursor-pointer ${badgeStyle}`}
              >
                <div className="font-bold truncate text-[#f5ede1]">{char.name}</div>
                <div className="text-[10px] mt-1 flex items-center justify-between opacity-90">
                  <span>{statusText}</span>
                  {status === 'culprit' && <AlertCircle className="w-3 h-3 text-[#e63946]" />}
                  {status === 'innocent' && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                  {status === 'suspicious' && <HelpCircle className="w-3 h-3 text-[#d4af37]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Freeform Notes Textarea */}
      <div>
        <label className="block text-xs text-[#b8a995] mb-1.5">
          실시간 단서 및 알리바이 메모
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="인물들의 모순된 증언, 사건 시각 알리바이, 발견된 유류품(손수건, 와인병, 약병 등)에 대해 자유롭게 기록하십시오..."
          rows={5}
          className="w-full p-3 bg-[#130f0d] border border-[#b48c36]/40 rounded-sm text-sm text-[#f5ede1] placeholder:text-[#5a4e44] focus:outline-none focus:border-[#d4af37] font-sans resize-y leading-relaxed"
        />
        <div className="text-[11px] text-[#7a6a5d] mt-1 flex justify-between">
          <span>* 기기 브라우저에만 저장되며 페이지를 새로고침해도 유지됩니다.</span>
          <span>{notes.length}자</span>
        </div>
      </div>
    </div>
  );
};
