import React, { useState, useRef } from 'react';
import { createWorker } from 'tesseract.js';
import { Camera, Image as ImageIcon, Loader2, Check, Copy, ArrowRight, RefreshCw, X, Sparkles, FileText } from 'lucide-react';
import { playStampSlamSound, playTypewriterJamSound } from '../utils/sound';

interface GmOcrScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyText: (text: string, targetField: 'secret' | 'public' | 'synopsis') => void;
  currentCharacterName?: string;
}

export const GmOcrScanner: React.FC<GmOcrScannerProps> = ({
  isOpen,
  onClose,
  onApplyText,
  currentCharacterName,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progressStatus, setProgressStatus] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [extractedText, setExtractedText] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setExtractedText('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartOCR = async () => {
    if (!selectedImage) return;

    setIsScanning(true);
    setProgressPercent(5);
    setProgressStatus('광학 판독기 초기화 중...');

    try {
      // Create Tesseract worker for Korean + English
      const worker = await createWorker(['kor', 'eng'], undefined, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            const p = Math.round((m.progress || 0) * 100);
            setProgressPercent(Math.max(10, p));
            setProgressStatus(`활판 한글 인쇄물 판독 중... (${p}%)`);
          } else if (m.status === 'loading tesseract core') {
            setProgressStatus('판독 엔진 로딩 중...');
          } else if (m.status === 'loading language traineddata') {
            setProgressStatus('한글 서체 사전 로딩 중...');
          }
        },
      });

      setProgressStatus('문자 인식 및 추출 중...');
      const { data } = await worker.recognize(selectedImage);
      await worker.terminate();

      const cleanedText = (data.text || '').trim();
      setExtractedText(cleanedText);
      playStampSlamSound();
      setProgressStatus('판독 완료!');
    } catch (err: any) {
      console.error(err);
      playTypewriterJamSound();
      alert('문자 인식 중 오류가 발생했습니다. 조명이 밝은 상태에서 다시 촬영해 주세요.');
      setProgressStatus('판독 실패');
    } finally {
      setIsScanning(false);
    }
  };

  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = (targetField: 'secret' | 'public' | 'synopsis') => {
    if (!extractedText.trim()) return;
    onApplyText(extractedText.trim(), targetField);
    playStampSlamSound();
    onClose();
  };

  const handleReset = () => {
    setSelectedImage(null);
    setExtractedText('');
    setProgressPercent(0);
    setProgressStatus('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm animate-fade-in font-serif">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#1a1411] border-2 border-[#b48c36] shadow-2xl rounded-sm overflow-hidden"
        style={{
          boxShadow: '0 0 50px rgba(0,0,0,0.9), inset 0 0 60px rgba(180,140,54,0.1)',
        }}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#241c18] border-b border-[#b48c36]/40 text-[#f5ede1]">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-[#800f13] border border-[#b48c36]/50">
              <Camera className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#f5ede1] font-title">
                실물 시나리오 서류 카메라 판독기 (OCR 텍스트 변환)
              </h3>
              <p className="text-[10px] text-[#a89988] font-sans">
                인쇄된 종이 시나리오나 룰북을 촬영하면 한글 텍스트로 즉시 변환합니다.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#a89988] hover:text-[#f5ede1]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden File Inputs */}
        {/* Camera input with capture="environment" for smartphone back camera */}
        <input
          type="file"
          ref={cameraInputRef}
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleImageSelect}
        />
        {/* Standard gallery file input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 text-xs font-sans text-[#e8dfcc]">
          {!selectedImage ? (
            /* STEP 1: CAPTURE / SELECT IMAGE */
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#241c17] border-2 border-dashed border-[#b48c36]/60 flex items-center justify-center text-[#d4af37]">
                <Camera className="w-10 h-10 animate-pulse" />
              </div>

              <div>
                <h4 className="font-bold text-base text-[#f5ede1] font-serif">
                  종이 시나리오를 카메라로 촬영하거나 사진을 업로드하세요
                </h4>
                <p className="text-xs text-[#a89988] max-w-md mt-1 leading-relaxed">
                  머더미스터리 실물 패키지의 인물 설정집, 시놉시스, 단서 카드를 스마트폰 카메라로 찍으면 인공지능이 한글 텍스트로 옮겨 적어줍니다.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="px-5 py-2.5 bg-[#8b261e] hover:bg-[#a31621] text-[#f5ede1] font-bold text-sm border border-[#b48c36] shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                >
                  <Camera className="w-4 h-4 text-[#d4af37]" />
                  <span>카메라로 직접 촬영</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 bg-[#251e18] hover:bg-[#342a22] text-[#d4af37] text-sm border border-[#5a483a] flex items-center gap-2 cursor-pointer transition-all"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>갤러리 사진 불러오기</span>
                </button>
              </div>

              <div className="text-[11px] text-[#7a6a5d] pt-3 border-t border-[#3a2d24] max-w-sm">
                * 한글/영문 인쇄물 판독을 지원하며, 평평하게 펴서 글자가 선명할수록 인식률이 높아집니다.
              </div>
            </div>
          ) : (
            /* STEP 2: PREVIEW & OCR PROCESSING & RESULTS */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Image Preview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#a89988]">
                    <span>촬영된 서류 원본</span>
                    <button
                      onClick={handleReset}
                      className="text-[#d4af37] hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>다시 촬영하기</span>
                    </button>
                  </div>
                  <div className="relative border border-[#5a483a] bg-[#120f0d] rounded-sm max-h-60 overflow-hidden flex items-center justify-center">
                    <img
                      src={selectedImage}
                      alt="촬영된 시나리오"
                      className="max-h-60 object-contain w-full"
                    />
                    {isScanning && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4 text-center">
                        <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin mb-2" />
                        <span className="text-xs text-[#f5ede1] font-bold">
                          {progressStatus}
                        </span>
                        <div className="w-48 bg-neutral-800 rounded-full h-2 mt-2 overflow-hidden border border-[#5a483a]">
                          <div
                            className="bg-[#d4af37] h-full transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {!extractedText && !isScanning && (
                    <button
                      onClick={handleStartOCR}
                      className="w-full py-2.5 bg-[#8b261e] hover:bg-[#a31621] text-[#f5ede1] font-bold text-sm border border-[#b48c36] shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-[#d4af37]" />
                      <span>한글 텍스트 자동 변환 시작</span>
                    </button>
                  )}
                </div>

                {/* Right: Extracted Text Editor */}
                <div className="space-y-2 flex flex-col">
                  <div className="flex items-center justify-between text-xs text-[#a89988]">
                    <span className="text-[#f5ede1] font-bold">
                      변환된 텍스트 결과 (편집 가능)
                    </span>
                    {extractedText && (
                      <button
                        onClick={handleCopy}
                        className="text-[#d4af37] hover:underline flex items-center gap-1"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? '복사됨' : '복사'}</span>
                      </button>
                    )}
                  </div>

                  <textarea
                    value={extractedText}
                    onChange={(e) => setExtractedText(e.target.value)}
                    placeholder={
                      isScanning
                        ? '인쇄물에서 글자를 판독하는 중입니다...'
                        : '좌측의 [한글 텍스트 자동 변환 시작] 버튼을 누르면 여기에 글자가 나타납니다. 오탈자가 있다면 직접 수정할 수 있습니다.'
                    }
                    rows={8}
                    className="w-full flex-1 p-3 bg-[#120f0d] border border-[#5a483a] text-[#f5ede1] rounded-sm text-xs leading-relaxed focus:border-[#d4af37] focus:outline-none resize-none font-sans"
                  />
                  <div className="text-[10px] text-[#7a6a5d] flex justify-between">
                    <span>* 빛 반사로 오탈자가 생긴 경우 직접 타이핑하여 교정할 수 있습니다.</span>
                    <span>{extractedText.length}자</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons to Apply Extracted Text */}
              {extractedText && (
                <div className="p-3 bg-[#241c18] border border-[#b48c36]/40 rounded-sm space-y-2 animate-fade-in font-serif">
                  <div className="text-xs text-[#d4af37] font-bold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>추출한 텍스트를 시나리오 편집기에 즉시 적용:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-sans">
                    <button
                      onClick={() => handleApply('secret')}
                      className="p-2 bg-[#421316] hover:bg-[#59161a] border border-[#9b2226] text-[#ffccd5] rounded-sm flex items-center justify-center gap-1.5 cursor-pointer font-bold"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-[#ff8fa3]" />
                      <span>
                        {currentCharacterName ? `[${currentCharacterName}]의 비공개 밀서로 삽입` : '비공개 밀서로 삽입'}
                      </span>
                    </button>

                    <button
                      onClick={() => handleApply('public')}
                      className="p-2 bg-[#1b221a] hover:bg-[#253024] border border-emerald-700 text-emerald-300 rounded-sm flex items-center justify-center gap-1.5 cursor-pointer font-bold"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                      <span>
                        {currentCharacterName ? `[${currentCharacterName}]의 공개 증언으로 삽입` : '공개 증언으로 삽입'}
                      </span>
                    </button>

                    <button
                      onClick={() => handleApply('synopsis')}
                      className="p-2 bg-[#251e18] hover:bg-[#342a22] border border-[#b48c36]/60 text-[#f5ede1] rounded-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>사건 시놉시스로 삽입</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
