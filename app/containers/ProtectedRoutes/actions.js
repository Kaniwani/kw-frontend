import actionTypeCreator, { SYNC } from 'redux-action-types-creator';
import { createActions } from 'redux-actions';
import * as api from 'shared/api';

export const TYPES = actionTypeCreator('KW')({
  USER: {
    SRS: SYNC,
    LOAD: SYNC,
  },
  REVIEWS: {
    LOAD: SYNC,
  },
  VOCAB: {
    LEVELS: {
      LOAD: SYNC,
    },
    LEVEL: {
      LOAD: SYNC,
    },
    ENTRY: {
      LOAD: SYNC,
    },
  },
});

// https://github.com/acdlite/flux-standard-action
export const {
  loadUser,
  syncUser,
  loadReviews,
  loadVocabLevels,
  loadVocabLevel,
  loadVocabEntry,
} = createActions(
  {
    [TYPES.USER.LOAD]: api.getUserProfile,
    [TYPES.USER.SRS]: api.syncKw,
    [TYPES.REVIEWS.LOAD]: api.getCurrentReviews,
    [TYPES.VOCAB.LEVELS.LOAD]: api.getLevels,
    [TYPES.VOCAB.LEVEL.LOAD]: api.getLevel,
    [TYPES.VOCAB.ENTRY.LOAD]: api.getVocabularyEntry,
  },
);
