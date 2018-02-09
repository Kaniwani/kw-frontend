import { random, sample, sampleSize, range, uniq, flatMapDeep, flatMap } from 'lodash';
import { parse } from 'date-fns';
import faker from 'faker/locale/en';
import reviewResponse from 'common/data/api/reviews';
import { halfChance } from './utils';

const { results: reviews } = reviewResponse;

export const meanings = flatMap(reviews, (x) => x.vocabulary.meaning.split(', '));
export const readings = flatMap(reviews, (x) => x.vocabulary.readings.map((r) => r.kana));

export const wordSets = flatMap(reviews, () =>
  readings.map(({ character, kana, furigana, pitch }) => ({
    word: character,
    primaryReading: kana,
    secondaryReadings: sampleSize(readings, random(2)),
    furi: furigana != null ? furigana : '',
    pitch: pitch != null ? pitch.split(',').map(Number) : [],
  }))
);

export const words = flatMap(reviews, (x) => x.vocabulary.readings.map((r) => r.character));
export const tags = uniq(
  flatMapDeep(reviews, (x) => x.vocabulary.readings.map((r) => r.parts_of_speech))
);
export const sentences = flatMap(reviews, (x) =>
  x.vocabulary.readings.map((r) => ({
    sentenceEn: r.sentence_en,
    sentenceJa: r.sentence_ja,
  }))
);
export const synonyms = sampleSize(wordSets, random(2)).map(({ word, primaryReading }) => ({
  id: random(300),
  word,
  primaryReading,
}));

export const stats = flatMap(reviews, ({ vocabulary, ...review }) => ({
  synonyms,
  correct: random(6),
  incorrect: random(6),
  streak: random(9),
  lastStudied: halfChance(false, faker.date.past()),
  needsReview: halfChance(true, false),
  unlockDate: parse(review.unlock_date),
  nextReviewDate: parse(review.next_review_date),
  burned: halfChance(true, false),
  critical: halfChance(true, false),
  hidden: halfChance(true, false),
  wanikaniStreak: random(9),
  wanikaniBurned: halfChance(true, false),
}));

export default range(60).map(() => ({
  ...sample(stats),
  id: random(1, 1000),
  level: random(1, 60),
  tags: sampleSize(tags, random(1, 4)),
  primaryMeaning: sample(meanings),
  secondaryMeanings: sampleSize(meanings, random(4)),
  ...sample(wordSets),
  ...sample(sentences),
}));
