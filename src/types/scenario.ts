import { EncryptedPayload } from '../utils/crypto';

export interface PublicCharacterInfo {
  appearance: string;
  timeline: string;
  testimony: string;
  belongings: string[];
}

export interface CharacterData {
  id: string;
  name: string;
  hanchaName?: string;
  age: number;
  gender: '남' | '여';
  occupation: string;
  summary: string;
  avatarIcon: 'detective' | 'singer' | 'manager' | 'doctor' | 'scholar' | string;
  passwordHint?: string;
  publicInfo: PublicCharacterInfo;
  encryptedSecret: EncryptedPayload;
  encryptedSecretAlt?: EncryptedPayload;
  encryptedSecretForGm: EncryptedPayload;
}

export interface VictimInfo {
  name: string;
  age: number;
  description: string;
  causeOfDeath: string;
  crimeScene: string;
}

export interface ScenarioData {
  id: string;
  title: string;
  subtitle: string;
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
