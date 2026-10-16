import React, { useState, useEffect } from 'react';
import {
  getActiveRoomId,
  setActiveRoomId,
  getRoomShareLink,
  RoomSyncState,
  ROOM_STATUS_EVENT,
  DEFAULT_ROOM_ID,
} from '../utils/mqttSync';
import { fetchLatestState, getStoredPhaseVisibility } from '../utils/phaseStorage';
import { playBrassChime, playStampSlamSound } from '../utils/sound';
import {
  Wifi,
  Radio,
  Share2,
  Copy,
  Check,
  RotateCw,
  X,
  Smartphone,
  Monitor,
  KeyRound,
  ShieldAlert,
} from 'lucide-react';

interface RoomSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoomSyncModal: React.FC<RoomSyncModalProps> = ({ isOpen, onClose }) => {
  const [roomId, setRoomId] = useState<string>(getActiveRoomId());
  const [inputRoomId, setInputRoomId] = useState<string>(getActiveRoomId());
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  useEffect(() => {
    const handleRoomStatus = (e: any) => {
      if (e.detail) {
        const state: RoomSyncState = e.detail;
        setIsConnected(state.connected);
        setRoomId(state.roomId);
        setInputRoomId(state.roomId);
      }
    };

    window.addEventListener(ROOM_STATUS_EVENT, handleRoomStatus);
    return () => {
      window.removeEventListener(ROOM_STATUS_EVENT, handleRoomStatus);
    };
  }, []);

  if (!isOpen) return null;

  const handleApplyRoom = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = inputRoomId.trim() || DEFAULT_ROOM_ID;
    setActiveRoomId(clean);
    setRoomId(clean);
    playStampSlamSound();
    setSyncFeedback(`방 코드가 [${clean}] (으)로 변경되었습니다.`);
    setTimeout(() => setSyncFeedback(null), 3000);
  };

  const handleResetToDefault = () => {
    setActiveRoomId(DEFAULT_ROOM_ID);
    setRoomId(DEFAULT_ROOM_ID);
    setInputRoomId(DEFAULT_ROOM_ID);
    playStampSlamSound();
    setSyncFeedback('기본 공용방으로 재설정되었습니다.');
    setTimeout(() => setSyncFeedback(null), 3000);
  };

  const handleCopyLink = async () => {
    const link = getRoomShareLink(roomId);
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
      playBrassChime();
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = link;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleForceSync = async () => {
    setIsSyncing(true);
    await fetchLatestState();
    playBrassChime();
    setIsSyncing(false);
    setSyncFeedback('최신 동기화가 완료되었습니다.');
    setTimeout(() => setSyncFeedback(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in font-serif">
      <div
        className="relative w-full max-w-md bg-[#1c1511] border-2 border-[#b48c36] text-[#e8dfcc] p-5 sm:p-6 rounded-sm shadow-2xl space-y-4"
        style={{
          boxShadow: '0 12px 50px rgba(0,0,0,0.9), inset 0 0 40px rgba(180, 140, 54, 0.1)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#44362b] pb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#d4af37] animate-pulse" />
            <h3 className="font-bold text-base text-[#f5ede1] font-title">
              모바일 · PC 실시간 동기화 제어실
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#a89988] hover:text-[#f5ede1] hover:bg-[#2b2019] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Card */}
        <div
          className={`p-3.5 rounded border flex items-center justify-between ${
            isConnected
              ? 'bg-[#142316] border-emerald-700/70 text-emerald-300'
              : 'bg-[#2b1914] border-red-800/70 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'
              }`}
            />
            <div>
              <div className="text-xs font-bold">
                {isConnected ? '클라우드 실시간 소켓 정상 연결됨' : '연결 확인 중...'}
              </div>
              <div className="text-[11px] opacity-80 font-sans">
                현재 접속 방: <strong className="font-mono text-[#d4af37]">{roomId}</strong>
              </div>
            </div>
          </div>
          <button
            onClick={handleForceSync}
            disabled={isSyncing}
            className="px-2 py-1 bg-black/40 hover:bg-black/60 rounded text-[11px] border border-current flex items-center gap-1 active:scale-95 transition-transform cursor-pointer"
          >
            <RotateCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>즉시 동기화</span>
          </button>
        </div>

        {syncFeedback && (
          <div className="p-2 bg-[#251e18] border border-[#d4af37]/60 text-[#d4af37] text-xs text-center rounded animate-fade-in font-sans">
            ✓ {syncFeedback}
          </div>
        )}

        {/* How it works info */}
        <div className="text-xs text-[#a89988] space-y-1.5 bg-[#140e0b] p-3 rounded border border-[#382b22] leading-relaxed">
          <div className="flex items-center gap-1.5 text-[#d4af37] font-semibold">
            <Smartphone className="w-3.5 h-3.5" />
            <span>스마트폰과 PC가 서로 즉시 연동되는 원리:</span>
          </div>
          <p>
            GM이 PC에서 단계를 ON/OFF 잠금 토글하면, 같은 방에 접속된 모든 탐정 스마트폰에{' '}
            <strong className="text-[#f5ede1]">0.05초 만에 실시간으로 반영</strong>됩니다.
          </p>
        </div>

        {/* Room Code Form */}
        <form onSubmit={handleApplyRoom} className="space-y-2">
          <label className="block text-xs font-bold text-[#f5ede1]">
            <KeyRound className="w-3.5 h-3.5 inline mr-1 text-[#d4af37]" />
            방 코드 (Room Code) 설정
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputRoomId}
              onChange={(e) => setInputRoomId(e.target.value)}
              placeholder="예: 우리팀방, 7777 등"
              className="flex-1 bg-[#120e0c] border border-[#523d32] focus:border-[#d4af37] px-3 py-1.5 rounded-xs text-xs text-[#f5ede1] outline-none font-mono"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#8b261e] hover:bg-[#a52a22] text-[#f5ede1] font-bold text-xs rounded-xs border border-[#b48c36] cursor-pointer transition-transform active:scale-95"
            >
              방 적용
            </button>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#8c7e73]">
            <span>서로 다른 팀끼리 섞이지 않으려면 고유 방 코드를 입력하세요.</span>
            {roomId !== DEFAULT_ROOM_ID && (
              <button
                type="button"
                onClick={handleResetToDefault}
                className="text-[#d4af37] hover:underline"
              >
                기본방 복귀
              </button>
            )}
          </div>
        </form>

        {/* Share Mobile Link Section */}
        <div className="p-3 bg-[#17110e] border border-[#44362b] rounded-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#f5ede1]">
            <span className="flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>탐정 스마트폰 초대 링크</span>
            </span>
            <span className="text-[10px] text-[#a89988] font-normal">
              (이 링크로 열면 바로 같은 방에 자동 접속됨)
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className={`w-full py-2.5 px-3 rounded-xs font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer shadow-md ${
              isCopied
                ? 'bg-emerald-900/80 border-emerald-500 text-emerald-200 scale-[0.99]'
                : 'bg-[#291f19] hover:bg-[#382b22] border-[#d4af37] text-[#d4af37]'
            }`}
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>스마트폰 초대 링크 복사 완료! (카톡에 붙여넣기 하세요)</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#d4af37]" />
                <span>스마트폰 접속용 공유 링크 복사하기</span>
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#44362b] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#251e18] hover:bg-[#342a22] text-[#d4af37] border border-[#b48c36]/60 rounded-xs text-xs font-bold cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
