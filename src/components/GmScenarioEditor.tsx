import React, { useState } from 'react';
import { ScenarioData, CharacterData } from '../types/scenario';
import { encryptAESGCM, hashPassword } from '../utils/crypto';
import { GmOcrScanner } from './GmOcrScanner';
import { Save, Copy, Check, Plus, Trash2, Download, Upload, Sparkles, RefreshCw, Camera } from 'lucide-react';

interface EditableCharacter {
  id: string;
  name: string;
  hanchaName: string;
  age: number;
  gender: '남' | '여';
  occupation: string;
  summary: string;
  avatarIcon: string;
  password: string;
  passwordHint: string;
  appearance: string;
  timeline: string;
  testimony: string;
  belongings: string;
  secretInfo: string;
}

interface GmScenarioEditorProps {
  scenario: ScenarioData;
  onUpdateScenario: (updated: ScenarioData) => void;
  currentGmPassword: string;
}

export const GmScenarioEditor: React.FC<GmScenarioEditorProps> = ({
  scenario,
  onUpdateScenario,
  currentGmPassword,
}) => {
  const [title, setTitle] = useState(scenario.title);
  const [subtitle, setSubtitle] = useState(scenario.subtitle);
  const [date, setDate] = useState(scenario.date);
  const [location, setLocation] = useState(scenario.location);
  const [synopsis, setSynopsis] = useState(scenario.synopsis);
  const [defaultTimerMinutes, setDefaultTimerMinutes] = useState(scenario.defaultTimerMinutes || 60);

  // Victim state
  const [victimName, setVictimName] = useState(scenario.victim.name);
  const [victimAge, setVictimAge] = useState(scenario.victim.age);
  const [victimDesc, setVictimDesc] = useState(scenario.victim.description);
  const [victimCause, setVictimCause] = useState(scenario.victim.causeOfDeath);
  const [victimCrimeScene, setVictimCrimeScene] = useState(scenario.victim.crimeScene);

  // GM Password setting
  const [adminPassword, setAdminPassword] = useState(currentGmPassword || 'boardbang1930');

  // OCR Scanner Modal State
  const [showOcrScanner, setShowOcrScanner] = useState(false);
  const [ocrTargetField, setOcrTargetField] = useState<'secret' | 'public' | 'synopsis'>('secret');

  // Characters in editable form
  const [editableChars, setEditableChars] = useState<EditableCharacter[]>(() => {
    // Default preset passwords and secrets for initial 5 characters
    const defaultPasswords: Record<string, { pw: string; hint: string }> = {
      char_1: { pw: '단풍잎', hint: '비밀번호: 단풍잎 (또는 1931)' },
      char_2: { pw: '벨벳', hint: '비밀번호: 벨벳 (또는 2048)' },
      char_3: { pw: '회중시계', hint: '비밀번호: 회중시계 (또는 7733)' },
      char_4: { pw: '혜민', hint: '비밀번호: 혜민 (또는 5512)' },
      char_5: { pw: '인텔리', hint: '비밀번호: 인텔리 (또는 9090)' },
    };

    return scenario.characters.map((c) => ({
      id: c.id,
      name: c.name,
      hanchaName: c.hanchaName || '',
      age: c.age,
      gender: c.gender,
      occupation: c.occupation,
      summary: c.summary,
      avatarIcon: c.avatarIcon,
      password: defaultPasswords[c.id]?.pw || '1234',
      passwordHint: c.passwordHint || defaultPasswords[c.id]?.hint || '비밀번호: 1234',
      appearance: c.publicInfo.appearance,
      timeline: c.publicInfo.timeline,
      testimony: c.publicInfo.testimony,
      belongings: c.publicInfo.belongings.join(', '),
      secretInfo: `[극비 진실과 개인 목표]
- 인물: ${c.name}
- 사건 당시 은밀한 행적과 당신의 숨겨진 비밀을 여기에 작성하십시오.`,
    }));
  });

  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<'prompt' | 'json' | null>(null);
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  const handleAddCharacter = () => {
    const newId = `char_${Date.now()}`;
    const newChar: EditableCharacter = {
      id: newId,
      name: '새 등장인물',
      hanchaName: '新人物',
      age: 30,
      gender: '남',
      occupation: '새로운 용의자',
      summary: '사건 당일 현장에 있었던 수수께끼의 인물.',
      avatarIcon: 'detective',
      password: '암호123',
      passwordHint: '비밀번호: 암호123',
      appearance: '눈에 띄는 복장을 하고 있다.',
      timeline: '사건 당시 현장 근처에 있었다고 진술.',
      testimony: '저는 아무것도 보지 못했습니다.',
      belongings: '회중시계, 만년필',
      secretInfo: `[극비 신상 및 비밀 목표]
당신의 진짜 정체와 오늘 밤의 진실을 여기에 기록하십시오.`,
    };
    setEditableChars([...editableChars, newChar]);
    setActiveCharIndex(editableChars.length);
  };

  const handleDeleteCharacter = (index: number) => {
    if (editableChars.length <= 1) {
      alert('최소 1명 이상의 등장인물이 필요합니다.');
      return;
    }
    if (confirm(`'${editableChars[index].name}' 인물을 삭제하시겠습니까?`)) {
      const next = editableChars.filter((_, i) => i !== index);
      setEditableChars(next);
      setActiveCharIndex(Math.max(0, index - 1));
    }
  };

  const updateActiveChar = (field: keyof EditableCharacter, val: any) => {
    setEditableChars((prev) => {
      const updated = [...prev];
      updated[activeCharIndex] = { ...updated[activeCharIndex], [field]: val };
      return updated;
    });
  };

  /**
   * Encrypts and exports scenario data as Claude prompt text and JSON
   */
  const handleExport = async () => {
    setIsExporting(true);
    setExportResult(null);

    try {
      const adminHashResult = await hashPassword(adminPassword);

      const compiledCharacters: CharacterData[] = [];

      for (const ec of editableChars) {
        const encryptedSecret = await encryptAESGCM(ec.secretInfo, ec.password);
        const encryptedSecretForGm = await encryptAESGCM(ec.secretInfo, adminPassword);

        compiledCharacters.push({
          id: ec.id,
          name: ec.name,
          hanchaName: ec.hanchaName || undefined,
          age: Number(ec.age) || 25,
          gender: ec.gender,
          occupation: ec.occupation,
          summary: ec.summary,
          avatarIcon: ec.avatarIcon,
          passwordHint: ec.passwordHint || `비밀번호: ${ec.password}`,
          publicInfo: {
            appearance: ec.appearance,
            timeline: ec.timeline,
            testimony: ec.testimony,
            belongings: ec.belongings.split(',').map((s) => s.trim()).filter(Boolean),
          },
          encryptedSecret,
          encryptedSecretForGm,
        });
      }

      const updatedScenario: ScenarioData = {
        id: scenario.id || `custom_${Date.now()}`,
        title,
        subtitle,
        date,
        location,
        synopsis,
        victim: {
          name: victimName,
          age: Number(victimAge) || 50,
          description: victimDesc,
          causeOfDeath: victimCause,
          crimeScene: victimCrimeScene,
        },
        rulesAndEtiquette: scenario.rulesAndEtiquette,
        characters: compiledCharacters,
        adminPasswordHash: adminHashResult,
        defaultTimerMinutes: Number(defaultTimerMinutes) || 60,
      };

      // Immediately apply to current app session
      onUpdateScenario(updatedScenario);

      // Prepare Claude Prompt Export
      const promptText = `아래는 보드방정 머더미스터리 웹페이지에 즉시 적용할 새로운 시나리오 데이터입니다.
이 설정을 바탕으로 웹페이지를 갱신해줘.

\`\`\`json
${JSON.stringify(updatedScenario, null, 2)}
\`\`\`

【참고: 설정된 비밀번호 목록】
- 관리자(GM) 비밀번호: ${adminPassword}
${editableChars.map((c) => `- [${c.name}] (${c.occupation}) : 비밀번호 "${c.password}"`).join('\n')}
`;

      setExportResult(promptText);
    } catch (err: any) {
      alert(`암호화 및 내보내기 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyPrompt = () => {
    if (!exportResult) return;
    navigator.clipboard.writeText(exportResult);
    setCopiedType('prompt');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyJson = () => {
    if (!exportResult) return;
    const jsonMatch = exportResult.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      navigator.clipboard.writeText(jsonMatch[1]);
      setCopiedType('json');
      setTimeout(() => setCopiedType(null), 2000);
    }
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importJsonText.trim());
      if (!parsed.characters || !parsed.title) {
        throw new Error('올바른 시나리오 JSON 규격이 아닙니다.');
      }
      onUpdateScenario(parsed);
      setShowImportModal(false);
      alert('시나리오를 성공적으로 불러왔습니다!');
    } catch (err: any) {
      alert(`가져오기 실패: ${err.message}`);
    }
  };

  const handleApplyOcrText = (text: string, targetField: 'secret' | 'public' | 'synopsis') => {
    if (targetField === 'secret') {
      updateActiveChar('secretInfo', text);
    } else if (targetField === 'public') {
      updateActiveChar('testimony', text);
    } else if (targetField === 'synopsis') {
      setSynopsis(text);
    }
  };

  const activeChar = editableChars[activeCharIndex];

  return (
    <div className="space-y-6 font-serif">
      {/* Top Bar with Actions */}
      <div className="p-4 bg-[#231c17] border border-[#b48c36]/40 rounded-sm flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="font-bold text-base text-[#f5ede1] font-title">
            시나리오 편집 및 내보내기 도구
          </h4>
          <p className="text-xs text-[#a89988] font-sans">
            시나리오 내용, 등장인물, 비공개 밀서, 비밀번호를 자유롭게 수정 후 Web Crypto AES-GCM으로 암호화하여 내보냅니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOcrTargetField('secret');
              setShowOcrScanner(true);
            }}
            className="px-3 py-1.5 bg-[#421316] hover:bg-[#59161a] border border-[#9b2226] text-xs text-[#ffccd5] rounded-sm flex items-center gap-1.5 cursor-pointer font-bold shadow-sm"
          >
            <Camera className="w-3.5 h-3.5 text-[#ff8fa3]" />
            <span>카메라 서류 판독 (OCR)</span>
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className="px-3 py-1.5 bg-[#140f0c] border border-[#5a483a] text-xs text-[#c2b092] hover:text-[#f5ede1] flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>JSON 불러오기</span>
          </button>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 bg-[#8b261e] border border-[#b48c36] text-xs font-bold text-[#f5ede1] hover:brightness-110 flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            {isExporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5 text-[#d4af37]" />}
            <span>{isExporting ? '암호화 처리 중...' : '암호화 & 설정 내보내기'}</span>
          </button>
        </div>
      </div>

      {/* Basic Scenario Metadata */}
      <div className="p-4 sm:p-5 bg-[#1a1512] border border-[#b48c36]/30 rounded-sm space-y-4">
        <h5 className="font-bold text-sm text-[#d4af37] border-b border-[#3d3128] pb-1.5">
          1. 시나리오 기본 정보
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
          <div>
            <label className="block text-[#a89988] mb-1">시나리오 제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-[#120f0d] border border-[#5a483a] text-[#f5ede1] rounded-sm focus:border-[#d4af37] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#a89988] mb-1">부제 (분위기 문구)</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full p-2 bg-[#120f0d] border border-[#5a483a] text-[#f5ede1] rounded-sm focus:border-[#d4af37] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#a89988] mb-1">사건 일시</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 bg-[#120f0d] border border-[#5a483a] text-[#f5ede1] rounded-sm focus:border-[#d4af37] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#a89988] mb-1">사건 장소</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 bg-[#120f0d] border border-[#5a483a] text-[#f5ede1] rounded-sm focus:border-[#d4af37] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#a89988] mb-1">기본 타이머 (분)</label>
            <input
              type="number"
              value={defaultTimerMinutes}
              onChange={(e) => setDefaultTimerMinutes(Number(e.target.value))}
              className="w-full p-2 bg-[#120f0d] border border-[#5a483a] text-[#f5ede1] rounded-sm focus:border-[#d4af37] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#a89988] mb-1">관리자(GM) 비밀번호</label>
            <input
              type="text"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full p-2 bg-[#120f0d] border border-[#9b2226] text-[#e63946] font-bold rounded-sm focus:border-[#d4af37] focus:outline-none"
            />
          </div>
        </div>

        <div className="text-xs font-sans">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-[#a89988]">시놉시스 전문</label>
            <button
              type="button"
              onClick={() => {
                setOcrTargetField('synopsis');
                setShowOcrScanner(true);
              }}
              className="text-[11px] text-[#d4af37] hover:underline flex items-center gap-1 cursor-pointer font-serif"
            >
              <Camera className="w-3 h-3 text-[#d4af37]" />
              <span>종이 시놉시스 촬영 인식 (OCR)</span>
            </button>
          </div>
          <textarea
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            rows={5}
            className="w-full p-2 bg-[#120f0d] border border-[#5a483a] text-[#f5ede1] rounded-sm focus:border-[#d4af37] focus:outline-none leading-relaxed"
          />
        </div>
      </div>

      {/* Victim Info */}
      <div className="p-4 sm:p-5 bg-[#1a1512] border border-[#b48c36]/30 rounded-sm space-y-4">
        <h5 className="font-bold text-sm text-[#d4af37] border-b border-[#3d3128] pb-1.5">
          2. 피해자 및 현장 정보
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
          <div>
            <label className="block text-[#a89988] mb-1">피해자 이름</label>
            <input
              type="text"
              value={victimName}
              onChange={(e) => setVictimName(e.target.value)}
              className="w-full p-2 bg-[#120f0d] border border-[#5a483a] text-[#f5ede1] rounded-sm focus:border-[#d4af37] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#a89988] mb-1">피해자 나이</label>
            <input
              type="number"
              value={victimAge}
              onChange={(e) => setVictimAge(Number(e.target.value))}
              className="w-full p-2 bg-[#120f0d] border border-[#5a483a] text-[#f5ede1] rounded-sm focus:border-[#d4af37] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[#a89988] mb-1">사망 원인 및 시신 상태</label>
            <input
              type="text"
              value={victimCause}
              onChange={(e) => setVictimCause(e.target.value)}
              className="w-full p-2 bg-[#120f0d] border border-[#5a483a] text-[#f5ede1] rounded-sm focus:border-[#d4af37] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[#a89988] mb-1">현장 상황 (밀실 구조 등)</label>
            <input
              type="text"
              value={victimCrimeScene}
              onChange={(e) => setVictimCrimeScene(e.target.value)}
              className="w-full p-2 bg-[#120f0d] border border-[#5a483a] text-[#f5ede1] rounded-sm focus:border-[#d4af37] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[#a89988] mb-1">피해자 인물 설명</label>
            <textarea
              value={victimDesc}
              onChange={(e) => setVictimDesc(e.target.value)}
              rows={2}
              className="w-full p-2 bg-[#120f0d] border border-[#5a483a] text-[#f5ede1] rounded-sm focus:border-[#d4af37] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Characters Tabbed Editor */}
      <div className="p-4 sm:p-5 bg-[#1a1512] border border-[#b48c36]/30 rounded-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#3d3128] pb-2">
          <h5 className="font-bold text-sm text-[#d4af37]">
            3. 등장인물 및 비밀 밀서 편집 ({editableChars.length}명)
          </h5>

          <button
            onClick={handleAddCharacter}
            className="flex items-center gap-1 text-xs px-2.5 py-1 bg-[#251e18] border border-[#b48c36]/60 text-[#d4af37] hover:bg-[#342a22]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>인물 추가</span>
          </button>
        </div>

        {/* Character Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {editableChars.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveCharIndex(i)}
              className={`px-3 py-1.5 text-xs rounded-sm border transition-all cursor-pointer ${
                activeCharIndex === i
                  ? 'bg-[#8b261e] border-[#b48c36] text-[#f5ede1] font-bold'
                  : 'bg-[#140f0c] border-[#44362b] text-[#a89988] hover:text-[#f5ede1]'
              }`}
            >
              {c.name || `인물 ${i + 1}`}
            </button>
          ))}
        </div>

        {/* Active Character Form */}
        {activeChar && (
          <div className="p-4 bg-[#140f0c] border border-[#3d3128] rounded-sm space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b border-[#28211b] pb-2">
              <span className="font-bold text-sm text-[#f5ede1] font-title">
                [{activeChar.name}] 설정 수정
              </span>
              <button
                onClick={() => handleDeleteCharacter(activeCharIndex)}
                className="text-[#e63946] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>이 인물 삭제</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[#a89988] mb-1">이름</label>
                <input
                  type="text"
                  value={activeChar.name}
                  onChange={(e) => updateActiveChar('name', e.target.value)}
                  className="w-full p-2 bg-[#1a1512] border border-[#5a483a] text-[#f5ede1] rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[#a89988] mb-1">한자 이름 (선택)</label>
                <input
                  type="text"
                  value={activeChar.hanchaName}
                  onChange={(e) => updateActiveChar('hanchaName', e.target.value)}
                  placeholder="예: 尹世榮"
                  className="w-full p-2 bg-[#1a1512] border border-[#5a483a] text-[#f5ede1] rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[#a89988] mb-1">성별 및 나이</label>
                <div className="flex gap-2">
                  <select
                    value={activeChar.gender}
                    onChange={(e) => updateActiveChar('gender', e.target.value as '남' | '여')}
                    className="p-2 bg-[#1a1512] border border-[#5a483a] text-[#f5ede1] rounded-sm"
                  >
                    <option value="남">남</option>
                    <option value="여">여</option>
                  </select>
                  <input
                    type="number"
                    value={activeChar.age}
                    onChange={(e) => updateActiveChar('age', Number(e.target.value))}
                    className="w-full p-2 bg-[#1a1512] border border-[#5a483a] text-[#f5ede1] rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#a89988] mb-1">직업 및 타이틀</label>
                <input
                  type="text"
                  value={activeChar.occupation}
                  onChange={(e) => updateActiveChar('occupation', e.target.value)}
                  className="w-full p-2 bg-[#1a1512] border border-[#5a483a] text-[#f5ede1] rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[#a89988] mb-1">실루엣 아이콘 모티프</label>
                <select
                  value={activeChar.avatarIcon}
                  onChange={(e) => updateActiveChar('avatarIcon', e.target.value)}
                  className="w-full p-2 bg-[#1a1512] border border-[#5a483a] text-[#f5ede1] rounded-sm"
                >
                  <option value="detective">모던보이 / 탐정 (중절모)</option>
                  <option value="singer">프리마돈나 (핑거웨이브 / 깃털)</option>
                  <option value="manager">총지배인 (정장 / 회중시계)</option>
                  <option value="doctor">한의사 (도포 / 안경)</option>
                  <option value="scholar">법학도 / 인텔리 (베레모 / 뿔테)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#e63946] font-bold mb-1">
                  역할 비밀번호 (플레이어 암호)
                </label>
                <input
                  type="text"
                  value={activeChar.password}
                  onChange={(e) => updateActiveChar('password', e.target.value)}
                  className="w-full p-2 bg-[#1a1512] border border-[#e63946] text-[#ff8fa3] font-bold rounded-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#a89988] mb-1">한 줄 소개</label>
              <input
                type="text"
                value={activeChar.summary}
                onChange={(e) => updateActiveChar('summary', e.target.value)}
                className="w-full p-2 bg-[#1a1512] border border-[#5a483a] text-[#f5ede1] rounded-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#a89988] mb-1">공개된 외모 및 인상착의</label>
                <input
                  type="text"
                  value={activeChar.appearance}
                  onChange={(e) => updateActiveChar('appearance', e.target.value)}
                  className="w-full p-2 bg-[#1a1512] border border-[#5a483a] text-[#f5ede1] rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[#a89988] mb-1">소지품 (쉼표로 구분)</label>
                <input
                  type="text"
                  value={activeChar.belongings}
                  onChange={(e) => updateActiveChar('belongings', e.target.value)}
                  className="w-full p-2 bg-[#1a1512] border border-[#5a483a] text-[#f5ede1] rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[#a89988] mb-1">사건 당일 타임라인 (공개 알리바이)</label>
                <textarea
                  value={activeChar.timeline}
                  onChange={(e) => updateActiveChar('timeline', e.target.value)}
                  rows={2}
                  className="w-full p-2 bg-[#1a1512] border border-[#5a483a] text-[#f5ede1] rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[#a89988] mb-1">공개 증언</label>
                <textarea
                  value={activeChar.testimony}
                  onChange={(e) => updateActiveChar('testimony', e.target.value)}
                  rows={2}
                  className="w-full p-2 bg-[#1a1512] border border-[#5a483a] text-[#f5ede1] rounded-sm"
                />
              </div>
            </div>

            {/* Secret Dossier Plaintext Editor */}
            <div className="p-3 bg-[#241315] border border-[#9b2226] rounded-sm">
              <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                <div className="flex items-center gap-2">
                  <label className="block text-xs font-bold text-[#e63946]">
                    비공개 정보 (극비 밀서 원문 — '설정 내보내기' 시 AES-GCM으로 암호화됨)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setOcrTargetField('secret');
                      setShowOcrScanner(true);
                    }}
                    className="px-2 py-0.5 bg-[#59161a] hover:bg-[#7a181d] border border-[#9b2226] text-[11px] text-[#ffccd5] rounded-none flex items-center gap-1 cursor-pointer font-serif"
                  >
                    <Camera className="w-3 h-3 text-[#ff8fa3]" />
                    <span>종이 밀서 촬영 인식</span>
                  </button>
                </div>
                <span className="text-[10px] text-[#ff8fa3]">
                  암호: {activeChar.password}
                </span>
              </div>
              <textarea
                value={activeChar.secretInfo}
                onChange={(e) => updateActiveChar('secretInfo', e.target.value)}
                rows={6}
                className="w-full p-3 bg-[#130b0c] border border-[#9b2226]/50 text-[#f5ede1] rounded-sm font-sans text-xs leading-relaxed focus:outline-none focus:border-[#e63946]"
                placeholder="인물의 진짜 신분, 숨겨진 범죄 행위, 개인 승리 목표 등을 자세히 입력하십시오..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Export Result View */}
      {exportResult && (
        <div className="p-5 bg-[#172218] border-2 border-emerald-600 rounded-sm space-y-3 animate-fade-in font-sans">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400">
              <Check className="w-5 h-5" />
              <h5 className="font-bold text-sm">
                암호화 완료! 새 설정이 현재 페이지에 즉시 적용되었습니다.
              </h5>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyPrompt}
                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-sm text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {copiedType === 'prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Claude 프롬프트 복사</span>
              </button>

              <button
                onClick={handleCopyJson}
                className="px-3 py-1.5 bg-[#120f0d] border border-emerald-500 hover:bg-[#1a1614] text-emerald-300 rounded-sm text-xs flex items-center gap-1.5 cursor-pointer"
              >
                {copiedType === 'json' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>JSON만 복사</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-emerald-200/90 leading-relaxed">
            복사한 텍스트를 Claude 대화창에 붙여넣으면 영구적으로 새로운 시나리오가 웹사이트에 반영됩니다.
          </p>

          <pre className="p-3 bg-[#0c140d] border border-emerald-800 text-[11px] text-emerald-300 max-h-48 overflow-y-auto whitespace-pre-wrap rounded-sm font-mono">
            {exportResult}
          </pre>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#1a1512] border-2 border-[#b48c36] p-5 rounded-sm space-y-3 font-serif">
            <h4 className="font-bold text-base text-[#f5ede1]">
              시나리오 JSON 데이터 가져오기
            </h4>
            <p className="text-xs text-[#a89988] font-sans">
              이전에 내보냈거나 작성한 시나리오 JSON 객체를 붙여넣으십시오.
            </p>
            <textarea
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              rows={8}
              placeholder={`{\n  "title": "새 시나리오",\n  "characters": [...]\n}`}
              className="w-full p-2 bg-[#120f0d] border border-[#5a483a] text-[#f5ede1] text-xs font-mono rounded-sm"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-3 py-1.5 border border-[#5a483a] text-xs text-[#c2b092]"
              >
                취소
              </button>
              <button
                onClick={handleImport}
                className="px-4 py-1.5 bg-[#8b261e] border border-[#b48c36] text-xs text-white font-bold"
              >
                가져오기 적용
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OCR Scanner Modal */}
      {showOcrScanner && (
        <GmOcrScanner
          isOpen={showOcrScanner}
          onClose={() => setShowOcrScanner(false)}
          onApplyText={handleApplyOcrText}
          currentCharacterName={activeChar?.name}
        />
      )}
    </div>
  );
};
