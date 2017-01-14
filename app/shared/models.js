import { Record, List } from 'immutable';
import { SRS_RANKS } from 'shared/constants';

export const VocabReadingRecord = Record({
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

export class VocabReading extends VocabReadingRecord {
  getAllTags() {
    let allTags = this.tags;
    if (this.jlpt) allTags = allTags.concat(this.jlpt);
    if (this.common) allTags = allTags.concat(this.common);
    return allTags;
  }
}

export const VocabRecord = Record({
  id: null,
  meanings: new List(),
  synonyms: new List(),
  readings: new List(),
});

export const VocabEntryRecord = Record({
  id: null,
  correct: 0,
  incorrect: 0,
  streak: 0,
  notes: '',
  vocabulary: new VocabRecord({}),
  needsReview: false,
  isBurned: false,
  isHidden: false,
  isCritical: false,
  lastReviewDate: null,
  unlockDate: null,
  nextReviewDate: null,
  wanikani: {
    streak: 0,
    streakName: '',
    isBurned: false,
  },
});

export class VocabEntry extends VocabEntryRecord {
  getStreakName() {
    switch (true) {
      case (this.streak > 8): return SRS_RANKS.FIVE;
      case (this.streak > 7): return SRS_RANKS.FOUR;
      case (this.streak > 6): return SRS_RANKS.THREE;
      case (this.streak > 4): return SRS_RANKS.TWO;
      default: return SRS_RANKS.ONE;
    }
  }
}

export const VocabLevelRecord = Record({
  level: '',
  isLocked: true,
  count: 0,
});

export class VocabLevel extends VocabLevelRecord {
  getLockedText() {
    return this.isLocked ? 'locked' : 'unlocked';
  }
}
