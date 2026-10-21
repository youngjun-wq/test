import { EncryptedPayload } from '../utils/crypto';

export interface PublicCharacterInfo {
  text?: string;
  appearance?: string;
  timeline?: string;
  testimony?: string;
  belongings?: string[];
}

export type CharacterGroupId = 'carriage' | 'train';

export interface CharacterData {
  id: string;
  name: string;
  roleTitle?: string; // e.g., '베테랑 형사', '미모의 괴도'
  hanchaName?: string;
  playerName?: string; // 실명 (예: '조준흠', '김승주')
  imageUrl?: string; // 인물 초상화 사진 URL
  age: number | string;
  gender: '남' | '여' | '불명';
  occupation: string;
  summary: string;
  avatarIcon: 'detective' | 'thief' | 'journalist' | 'writer' | 'assistant' | 'cleaner' | string;
  group: CharacterGroupId; // 마차조 vs 기차조
  groupName: string; // '마차조' | '기차조'
  interviewTime?: string; // e.g. '6시 30분'
  hasSharpObjective?: boolean; // 전직 기자, 청소부
  passwordHint?: string;
  publicInfo: PublicCharacterInfo;
  encryptedSecret: EncryptedPayload;
  encryptedSecretAlt?: EncryptedPayload;
  encryptedSecretForGm: EncryptedPayload;
}

export interface VictimInfo {
  name: string;
  title: string;
  age: number;
  description: string;
  causeOfDeath: string;
  crimeScene: string;
  maskInfo: string;
}

export interface GamePhaseStory {
  id: string;
  numberTitle: string; // e.g. '오프닝 페이즈', '1장 이동 페이즈(15분)'
  name: string;
  durationMinutes?: number;
  storyHeading?: string;
  storyContent?: string;
  instructions: string[];
  guidanceAlert?: string;
  stopNotice?: string;
  specialActionNotice?: string;
}

export interface ScenarioData {
  id: string;
  title: string;
  subtitle: string;
  era: string; // '다이쇼(大正) 시대 초기'
  date: string;
  location: string;
  synopsis: string;
  victim: VictimInfo;
  rulesAndEtiquette: string[];
  characters: CharacterData[];
  adminPasswordHash: {
    hash: string;
    salt: string;
  };
  defaultTimerMinutes: number;
}
