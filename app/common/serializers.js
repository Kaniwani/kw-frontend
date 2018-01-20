/* eslint-disable camelcase */
// import { sortBy } from 'lodash';
import condenseReadings from 'common/utils/condenseReadings';
import { camelCaseKeys, snakeCaseKeys } from 'common/utils/caseKeys';
import toUniqueStringsArray from 'common/utils/toUniqueStringsArray';
import createDict from 'common/utils/createDict';

// TODO: potentially use `yup` for casting/validating types.
// simpler code to view using schema.cast() instead of stuff like announcements.map(({ id, ...rest }) => ({ id: +id, ...rest })));

export const serializeLoginResponse = ({ token }) => token;
export const serializeUserResponse = (res = {}) => serializeUser(res);
export const serializeReviewResponse = serializeReview;
export const serializeLevelsResponse = (res = {}) => createDict(res.map(serializeLevel), 'id');

export const serializeQueueResponse = ({ count, results }) => ({
  remaining: count,
  ...serializeReviews(results, true),
});

export const serializeLevelResponse = ({ results }) => serializeReviews(results);

export const serializeVocabSearchResponse = ({ results }, persistedReviews) => {
  const persistedIds = [];
  const missingIds = [];

  results.forEach(({ review, is_reviewable: isReviewable }) => {
    if (review && isReviewable) {
      (persistedReviews[review] ? persistedIds : missingIds).push(review);
    }
  });

  return { persistedIds, missingIds };
};

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
export function deserializeUserProfile(data) {
  return snakeCaseKeys(data);
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

export function serializeMeanings(meaning, meaningSynonyms) {
  const meaningStrings = meaning.split(', ');
  const synonymStrings = meaningSynonyms.map(({ text }) => text);

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

export function serializeReviews(data, isStubbed) {
  const reviewSerializer = isStubbed ? serializeStubbedReview : serializeReview;
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
  reading_synonyms,
  meaning_synonyms,
} = {}) {
  const vocabById = serializeVocabs(vocabulary.readings);
  const synonymsById = serializeSynonyms(reading_synonyms);
  const { primaryMeaning, secondaryMeanings } = serializeMeanings(
    vocabulary.meaning,
    meaning_synonyms
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
    nextReviewDate: next_review_date,
    lastStudied: last_studied,
    unlockDate: unlock_date,
    ...serializeStubbedReview(rest),
  };
}

/* eslint-disable */
// import levels from "common/data/api/levels";
// import review from "common/data/api/review";
// import reviews from "common/data/api/reviews";
// import stubbedReviews from "common/data/api/stubbedReviews";
// import user from "common/data/api/user";
// import vocabulary from "common/data/api/vocabulary";
//
// console.log(serializeLevelsResponse(levels));
// console.log(serializeReviewResponse(review));
// console.log(serializeLevelResponse(reviews));
// console.log(serializeQueueResponse(stubbedReviews));
// console.log(serializeUserResponse(user));
// console.log(serializeVocabSearchResponse(vocabulary));
