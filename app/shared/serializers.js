/* eslint-disable camelcase */
import { SRS_RANKS } from 'shared/constants';
import condenseReadings from 'utils/condenseReadings';
import dateOrFalse from 'utils/dateOrFalse';
import format from 'date-fns/format';
import addHours from 'date-fns/add_hours';
import addDays from 'date-fns/add_days';

import toUniqueStringsArray from 'utils/toUniqueStringsArray';

/* eslint-disable no-return-assign, no-sequences, no-param-reassign */
const createHashMap = (data) =>
  data.reduce((hash, item) => ((hash[item.id] = item), hash), {});
const formatSrsCounts = (obj) =>
  Object.entries(obj).reduce(
    (hash, [key, val]) => ((hash[key.toUpperCase()] = +val), hash),
    {}
  );

const serializeUpcomingReviews = (data = []) => {
  let extraDays = 0;
  const getFutureDayName = (daysAhead = 0) =>
    format(addDays(Date.now(), daysAhead), 'dddd');
  const genDay = (hour) => (hour === '12am' ? getFutureDayName((extraDays += 1)) : '');
  const genHour = (index) => `${format(addHours(new Date(), index + 1), 'ha')}`;

  return data.reduce((list, value, index) => {
    const hour = genHour(index);
    return list.concat({
      day: genDay(hour),
      hour,
      value,
    });
  }, []);
};
/* eslint-enable */

export const serializeUserResponse = serializeUser;
export const serializeLevelsResponse = serializeLevels;
export const serializeReviewResponse = serializeReviewEntry;
export const serializeAddSynonymResponse = serializeSynonym;
export const serializeAnnouncementsResponse = ({ results }) =>
  results.slice(0, 10).map(({ pub_date, title, body }) => ({
    title,
    body,
    pubDate: dateOrFalse(pub_date),
  }));

export const serializeQueueResponse = ({ results }) => {
  const reviews = serializeStubbedReviewEntries(results);
  return {
    reviews,
    ids: Object.keys(reviews).map(Number),
  };
};

export const serializeVocabularySearch = ({ results }) =>
  results.reduce((list, { review }) => (review ? list.concat(review) : list), []);

export const serializeLevelResponse = ({ id, results }) => {
  const reviews = serializeReviewEntries(results);
  return {
    id,
    reviews,
    ids: Object.keys(reviews).map(Number),
  };
};

function serializeLevels(levels = []) {
  return createHashMap(levels.map(serializeLevel));
}

function serializeMeaning(data) {
  return toUniqueStringsArray(data);
}

function serializeReadings(data = []) {
  return condenseReadings(data).map(serializeReading);
}

export function serializeReviewEntries(data = []) {
  return createHashMap(data.map(serializeReviewEntry));
}

function serializeStubbedReviewEntries(data = []) {
  return createHashMap(data.map(serializeStubbedReviewEntry));
}

function serializeUser({ email, profile }) {
  return {
    profile: serializeProfile({ email, ...profile }),
    settings: serializeSettings(profile),
  };
}

function serializeProfile({
  id,
  name,
  email,
  api_key: apiKey,
  api_valid: apiValid,
  join_date,
  level,
  unlocked_levels: unlockedLevels,
  reviews_count: reviewsCount,
  lessons_count: lessonsCount,
  reviews_within_hour_count: nextHourReviews,
  reviews_within_day_count: nextDayReviews,
  next_review_date: nextReviewDate,
  last_wanikani_sync_date: lastWkSyncDate,
  srs_counts: srsCounts,
  vacation_date: vacationDate,
  upcoming_reviews: upcomingReviews,
} = {}) {
  return {
    id,
    name,
    email,
    apiKey,
    isApiValid: !!apiValid,
    joinDate: dateOrFalse(join_date),
    currentLevel: +level,
    unlockedLevels: unlockedLevels.map(Number),
    reviewsCount: +reviewsCount,
    lessonsCount: +lessonsCount,
    nextHourReviews: +nextHourReviews,
    nextDayReviews: +nextDayReviews,
    nextReviewDate: dateOrFalse(nextReviewDate),
    vacationDate: dateOrFalse(vacationDate),
    lastWkSyncDate: dateOrFalse(lastWkSyncDate),
    srsCounts: formatSrsCounts(srsCounts),
    upcomingReviews: serializeUpcomingReviews(upcomingReviews),
  };
}

function serializeSettings({
  on_vacation: onVacation,
  follow_me: followMe,
  auto_advance_on_success: autoAdvanceCorrect = false,
  auto_advance_speed: autoAdvanceSpeed = 2000,
  auto_expand_answer_on_success: autoExpandCorrect = true,
  auto_expand_answer_on_failure: autoExpandIncorrect = true,
  minimum_wk_srs_level_to_review: minimumSrsToReview = SRS_RANKS.ONE,
  eijiro_pro_link: useEijiroPro = false,
  kanji_svg_step_speed = 0.01,
  kanji_svg_show_strokes = false,
  kanji_svg_show_grid = true,
} = {}) {
  return {
    quiz: {
      onVacation,
      minimumSrsToReview,
      autoExpandCorrect,
      autoExpandIncorrect,
      autoAdvance: {
        active: autoAdvanceCorrect,
        speed: autoAdvanceSpeed,
      },
    },
    vocabulary: {
      followMe,
      useEijiroPro,
      kanjiStroke: {
        step: kanji_svg_step_speed,
        stroke: { order: { visible: kanji_svg_show_strokes } },
        grid: { show: kanji_svg_show_grid },
      },
    },
  };
}

export function deserializeSettings({
  quiz: {
    onVacation: on_vacation,
    minimumSrsToReview: minimum_wk_srs_level_to_review,
    autoExpandCorrect: auto_expand_answer_on_success,
    autoExpandIncorrect: auto_expand_answer_on_failure,
    autoAdvance: { active: auto_advance_on_success, speed: auto_advance_speed },
  },
  vocabulary: {
    followMe: follow_me,
    useEijiroPro: eijiro_pro_link,
    kanjiStroke: {
      step: kanji_svg_step_speed,
      stroke: { order: { visible: kanji_svg_show_strokes } },
      grid: { show: kanji_svg_show_grid },
    },
  },
} = {}) {
  return {
    follow_me,
    on_vacation,
    minimum_wk_srs_level_to_review,
    auto_expand_answer_on_success,
    auto_expand_answer_on_failure,
    auto_advance_on_success,
    auto_advance_speed,
    eijiro_pro_link,
    kanji_svg_step_speed,
    kanji_svg_show_strokes,
    kanji_svg_show_grid,
  };
}

function serializeReading(reading) {
  return {
    id: +reading.id,
    level: +reading.level,
    isCommon: !!reading.common,
    character: reading.character,
    kana: toUniqueStringsArray(reading.kana),
    furi: reading.furigana || '',
    pitch: reading.pitch != null ? reading.pitch.split(',').map(Number) : [-1],
    // TODO: normalize parts of speech to entities? then selector converts to full text
    tags: reading.parts_of_speech,
    sentenceEn: reading.sentence_en || '',
    sentenceJa: reading.sentence_ja || '',
  };
}

function serializeVocabularyEntry({ id, meaning, readings } = {}) {
  return {
    id: +id,
    meanings: serializeMeaning(meaning),
    readings: serializeReadings(readings),
  };
}

function serializeSynonym({
  id, review, character, kana,
}) {
  return {
    id,
    reviewId: review,
    character,
    kana: [kana],
  };
}

function serializeSynonyms(synonyms = []) {
  return synonyms.map(serializeSynonym);
}

function serializeStubbedReviewEntry({
  id, correct, incorrect, streak, notes, vocabulary, answer_synonyms,
} = {}) {
  return {
    id: +id,
    correct: +correct,
    incorrect: +incorrect,
    streak: +streak,
    notes: notes == null ? '' : notes,
    synonyms: serializeSynonyms(answer_synonyms),
    vocabulary: serializeVocabularyEntry(vocabulary),
  };
}

function serializeReviewEntry({
  unlock_date: unlockDate,
  last_studied: lastReviewDate,
  next_review_date: nextReviewDate,
  needs_review: isReviewReady,
  hidden: isHidden,
  critical: isCritical,
  wanikani_srs_numeric,
  ...rest
} = {}) {
  return {
    isReviewReady,
    lastReviewDate: dateOrFalse(lastReviewDate),
    unlockDate: dateOrFalse(unlockDate),
    nextReviewDate: dateOrFalse(nextReviewDate),
    isHidden,
    isCritical,
    wkStreak: +wanikani_srs_numeric,
    ...serializeStubbedReviewEntry(rest),
  };
}

function serializeLevel({ level, vocabulary_count: count, unlocked }) {
  return {
    id: +level,
    count: +count,
    isLocked: !unlocked,
    reviews: [],
  };
}
