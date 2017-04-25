import { Record, List, Set } from 'immutable';

export const SessionRecord = new Record({
  currentId: '',
  total: null,
  queue: Set(),
  correct: Set(),
  incorrect: Set(),
  complete: Set(),
  // use selectors to compile ignored / critical etc
});

export const SynonymRecord = new Record({
  id: '',
  review: '',
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
  id: '',
  character: '',
  kana: '',
  level: '',
  tags: List(),
  sentenceEn: '',
  sentenceJa: '',
  jlpt: null,
  common: null,
});

export const ReviewVocabEntryRecord = Record({
  id: '',
  meanings: List(),
  readings: List(),
  synonyms: List(),
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
  id: '',
  history: new HistoryRecord(),
  session: new EntrySessionRecord(),
  notes: null,
  vocabulary: new ReviewVocabEntryRecord(),
});

export const ReviewEntryRecord = Record({
  id: '',
  history: new HistoryRecord(),
  session: new EntrySessionRecord(),
  notes: null,
  vocabulary: new ReviewVocabEntryRecord(),
  needsReview: false,
  isBurned: false,
  isHidden: false,
  isCritical: false,
  lastReviewDate: null,
  unlockDate: null,
  nextReviewDate: null,
  wanikani: new WkRecord(),
});

export const PanelsRecord = Record({
  show: 'none',
});

export const SettingsRecord = Record({
  autoAdvanceDelay: 3000,
  infoDetailLevel: 3,
  autoAdvanceCorrect: false,
  autoExpandCorrect: true,
  autoExpandIncorrect: true,
  reviewSrsLevelLimit: 'APRRENTICE',
  followMe: false,
  onVacation: false,
  vacationDate: null,
  compactSummary: true,
});

export const SrsCountRecord = Record({
  apprentice: 0,
  guru: 0,
  master: 0,
  enlightened: 0,
  burned: 0,
});

export const ProfileRecord = Record({
  name: '無名',
  email: null,
  reviewCount: 0,
  currentLevel: null,
  joinDate: null,
  apiKey: null,
  apiValid: null,
  lastWkSyncDate: null,
  lastKwSyncDate: null,
  unlockedLevels: List(),
  nextHourReviews: 0,
  nextDayReviews: 0,
  srsCount: new SrsCountRecord(),
  settings: new SettingsRecord(),
});

export const VocabularyRecord = Record({
  levels: List(),
  currentId: '',
  currentLevel: '',
  dirty: true,
});

export const LevelRecord = Record({
  level: '',
  count: 0,
  unlocked: false,
  ids: List(),
  submitting: false, // FIXME: setstate on button instead so this can't be persisted
});

export const VocabularyEntryRecord = Record({
  id: '',
  meanings: List(),
  readings: List(),
});
