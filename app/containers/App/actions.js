import actionTypeCreator, { SYNC } from 'redux-action-types-creator';
import { createAction } from 'redux-actions';
import * as api from 'shared/api';

export const TYPES = actionTypeCreator('APP')({
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

export const loadUser = createAction(TYPES.USER.LOAD, api.getUserProfile);
// export const syncUser = createAction(TYPES.USER.SRS); // () => api.syncKw
// export const loadReviews = createAction(TYPES.REVIEWS.LOAD); // () => api.getCurrentReviews
// export const loadVocabLevels = createAction(TYPES.VOCAB.LEVELS.LOAD); // () => api.getLevels
// export const loadVocabLevel = createAction(TYPES.VOCAB.LEVEL.LOAD); // () => api.getLevel
// export const loadVocabEntry = createAction(TYPES.VOCAB.ENTRY.LOAD); // () => api.getVocabularyEntry
