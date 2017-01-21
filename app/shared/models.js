import { Record, List, Set } from 'immutable';

export const SessionRecord = new Record({
  currentId: null,
  total: null,
  queue: new Set(),
  correct: new Set(),
  incorrect: new Set(),
  complete: new Set(),
  // use selectors to compile ignored / critical etc
});

export const SynonymRecord = new Record({
  id: null,
  review: null,
  character: '',
  kana: '',
});

export const AnswerRecord = new Record({
  input: '',
  type: '',
  marked: false,
  disabled: false,
  focus: false,
  correct: false,
  incorrect: false,
  valid: false,
});

export const ReadingRecord = Record({
  id: null,
  character: '',
  kana: '',
  level: 0,
  tags: new List(),
  sentenceEn: '',
  sentenceJa: '',
  jlpt: null,
  common: null,
});

export const VocabEntryRecord = Record({
  id: null,
  meanings: new List(),
  readings: new List(),
  synonyms: new List(),
});

const HistoryRecord = Record({
  streak: 0,
  correct: 0,
  incorrect: 0,
});
const EntrySessionRecord = Record({
  streak: 0,
  correct: 0,
  incorrect: 0,
  ignored: 0,
});
const WkRecord = Record({
  streak: 0,
  isBurned: false,
});

export const StubbedReviewEntryRecord = Record({
  id: null,
  history: new HistoryRecord(),
  session: new EntrySessionRecord(),
  notes: null,
  vocabulary: new VocabEntryRecord(),
});

export const ReviewEntryRecord = Record({
  id: null,
  history: new HistoryRecord(),
  session: new EntrySessionRecord(),
  notes: null,
  vocabulary: new VocabEntryRecord(),
  needsReview: false,
  isBurned: false,
  isHidden: false,
  isCritical: false,
  lastReviewDate: null,
  unlockDate: null,
  nextReviewDate: null,
  wanikani: new WkRecord(),
});

export const InfoPanelRecord = Record({
  detail: 1,
});

export const PanelsRecord = Record({
  show: 'none',
  info: new InfoPanelRecord(),
});

export const SettingsRecord = Record({
  autoAdvanceDelay: 3000,
  infoDetailLevel: 3,
  followMe: false,
  autoAdvanceCorrect: false,
  autoExpandCorrect: true,
  autoExpandIncorrect: true,
  burnedOnly: false,
  onVacation: false,
  vacationDate: null,
});

export const UserProfileRecord = Record({
  name: '無名',
  email: null,
  lastLogin: null,
  joinDate: null,
  isActive: null,
  apiKey: null,
  apiValid: null,
  lastWkSyncDate: null,
  lastKwSyncDate: null,
  level: null,
  unlockedLevels: new Set(),
  settings: new SettingsRecord(),
});

export const VocabLevelRecord = Record({
  level: '',
  count: 0,
  isLocked: true,
});
