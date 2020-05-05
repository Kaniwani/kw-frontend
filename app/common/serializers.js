/* eslint-disable camelcase */
import { /* flatMap, */ uniq } from 'lodash';
import condenseReadings from 'common/utils/condenseReadings';
import { camelCaseKeys, snakeCaseKeys } from 'common/utils/caseKeys';
import toUniqueStringsArray from 'common/utils/toUniqueStringsArray';
// import filterRomajiReadings from 'common/utils/filterRomajiReadings';
import createDict from 'common/utils/createDict';

export const serializeLoginResponse = ({ token }) => token;
export const serializeUserResponse = (res = {}) => serializeUser(res);
export const serializeReviewResponse = serializeReview;
export const serializeLevelsResponse = (res = {}) => createDict(res.map(serializeLevel), 'id');
export const serializeQueueResponse = ({ results }) => serializeReviews(results, serializeStubbedReview);
export const serializeLevelResponse = ({ results }) => serializeReviews(results, serializeReview);

export const serializeVocabSearchResponse = ({ results }, persistedReviews = {}) => {
  const persistedIds = [];
  const missingIds = [];
  const missingData = [];

  results.forEach(({ review, is_reviewable: isReviewable, ...vocabData }) => {
    if (review && isReviewable) {
      (persistedReviews[review] ? persistedIds : missingIds).push(review);
      if (!persistedReviews[review]) {
        missingData.push({ id: review, vocabulary: vocabData });
      }
    }
  });

  return {
    persistedIds,
    missingIds,
    missingData: serializeReviews(missingData, serializeSearchReviewData),
  };
};

export function serializeSearchReviewData({ id, vocabulary } = {}) {
  const vocabById = serializeVocabs(vocabulary.readings);
  const { primaryMeaning, secondaryMeanings } = serializeMeanings(
    vocabulary.meaning,
    [],
    Object.values(vocabById)
  );

  return {
    id: +id,
    primaryMeaning,
    secondaryMeanings,
    vocab: Object.keys(vocabById).map(Number),
    lastLoad: false,
    vocabById,
    synonymsById: {},
  };
}

export const serializeAddSynonymResponse = serializeSynonym;

export function serializeUser({ username, email, profile }) {
  return {
    username,
    email,
    profile: serializeUserProfile(profile),
  };
}

export function deserializeUser({ username, email, profile }) {
  return {
    username,
    email,
    profile: deserializeUserProfile(profile),
  };
}

export function serializeUserProfile(profile) {
  return camelCaseKeys(profile);
}

// HACK: snakecase turns apiKeyV2 into api_key_v_2
export function deserializeUserProfile({ apiKeyV2, ...profile }) {
  return { ...snakeCaseKeys(profile), api_key_v2: apiKeyV2 };
}

export function serializeAnnouncementsResponse({ results }) {
  return createDict(results.map(camelCaseKeys));
}

export function serializeLevel({ level, unlocked, vocabulary_count } = {}) {
  return {
    id: +level,
    count: +vocabulary_count,
    isLocked: !unlocked,
    reviews: [],
  };
}

export function serializeMeanings(meaning, meaningSynonyms /* , vocab */) {
  const meaningStrings = meaning.split(', ');
  const synonymStrings = uniq(meaningSynonyms.map(({ text }) => text.replace(/"/g, '')));
  // FIXME: disabled until this can be improved, currently only a partial success
  //  const readings = flatMap(vocab, (v) => [v.primaryReading, ...v.secondaryReadings]);
  //  const filteredMeanings = filterRomajiReadings(meaningStrings.concat(synonymStrings), readings);
  const [primaryMeaning, ...secondaryMeanings] = toUniqueStringsArray(
    meaningStrings.concat(synonymStrings)
  );

  return {
    primaryMeaning,
    secondaryMeanings,
  };
}

export function serializeVocabs(data = []) {
  return createDict(condenseReadings(data).map(serializeVocab), 'id');
}

export function serializeReviews(data, reviewSerializer) {
  const vocabById = {};
  const synonymsById = {};
  const reviews = [];

  data.forEach((item) => {
    const { vocabById: vocabs, synonymsById: synonyms, ...review } = reviewSerializer(item);

    Object.values(vocabs).forEach((v) => {
      vocabById[v.id] = v;
    });

    Object.values(synonyms).forEach((s) => {
      synonymsById[s.id] = s;
    });

    reviews.push(review);
  });

  const reviewsById = createDict(reviews, 'id');

  return {
    reviewIds: Object.keys(reviewsById).map(Number),
    reviewsById,
    vocabById,
    synonymsById,
  };
}

export function serializeVocab(vocab) {
  const [primaryReading, ...secondaryReadings] = toUniqueStringsArray(vocab.kana);

  return {
    id: +vocab.id,
    level: +vocab.level,
    word: vocab.character,
    primaryReading,
    secondaryReadings,
    furi: vocab.furigana || '',
    pitch: vocab.pitch != null ? vocab.pitch.split(',').map(Number) : [-1],
    tags: vocab.parts_of_speech,
    sentenceEn: vocab.sentence_en || '',
    sentenceJa: vocab.sentence_ja || '',
  };
}

export function serializeSynonym({ id, review, character, kana }) {
  return {
    id: +id,
    reviewId: +review,
    word: character,
    primaryReading: kana,
  };
}

export function serializeSynonyms(synonyms = []) {
  return createDict(synonyms.map(serializeSynonym), 'id');
}

export function serializeStubbedReview({
  id,
  correct,
  incorrect,
  streak,
  notes,
  vocabulary,
  reading_synonyms = [],
  meaning_synonyms = [],
} = {}) {
  const vocabById = serializeVocabs(vocabulary.readings);
  const synonymsById = serializeSynonyms(reading_synonyms);
  const { primaryMeaning, secondaryMeanings } = serializeMeanings(
    vocabulary.meaning,
    meaning_synonyms,
    Object.values(vocabById)
  );

  return {
    id: +id,
    primaryMeaning,
    secondaryMeanings,
    vocab: Object.keys(vocabById).map(Number),
    synonyms: Object.keys(synonymsById).map(Number),
    correct: +correct,
    incorrect: +incorrect,
    streak: +streak,
    notes: notes == null ? '' : notes,
    lastLoad: new Date(),
    vocabById,
    synonymsById,
  };
}

export function serializeReview({
  wanikani_srs_numeric,
  critical,
  hidden,
  needs_review,
  next_review_date,
  last_studied,
  unlock_date,
  ...rest
} = {}) {
  return {
    wanikaniStreak: +wanikani_srs_numeric,
    critical,
    hidden,
    needsReview: needs_review,
    nextReviewDate: next_review_date === null ? false : next_review_date,
    lastStudied: last_studied,
    unlockDate: unlock_date,
    ...serializeStubbedReview(rest),
  };
}
