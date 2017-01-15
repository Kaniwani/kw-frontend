import actionTypeCreator, { SYNC, ASYNC } from 'redux-action-types-creator';

const actionType = actionTypeCreator('KW/REVIEWSESSION');

const types = actionType({
  ANSWER: {
    UPDATE: SYNC,
    INPUT: SYNC,
    RESET: SYNC,
    CHECK: SYNC,
    RECORD: ASYNC,
    MARK: {
      CORRECT: SYNC,
      INCORRECT: SYNC,
      VALID: SYNC,
      INVALID: SYNC,
      IGNORED: SYNC,
    },
  },
  CURRENT: {
    SET_NEW: SYNC,
    ADD_TO: {
      QUEUE: SYNC,
      COMPLETE: SYNC,
      CORRECT: SYNC,
      INCORRECT: SYNC,
    },
    REMOVE_FROM: {
      QUEUE: SYNC,
      COMPLETE: SYNC,
      CORRECT: SYNC,
      INCORRECT: SYNC,
    },
    SYNONYM: {
      ADD: SYNC,
      REMOVE: SYNC,
    },
    STREAK: {
      INCREASE: SYNC,
      DECREASE: SYNC,
      REVERT: SYNC,
    },
    CORRECT: {
      INCREASE: SYNC,
      DECREASE: SYNC,
    },
    INCORRECT: {
      INCREASE: SYNC,
      DECREASE: SYNC,
    },
    IGNORED: {
      INCREASE: SYNC,
    },
  },
  AUTO_ADVANCE: {
    START: SYNC,
    CANCEL: SYNC,
  },
  PANELS: {
    UPDATE: SYNC,
    SHOW: SYNC,
    HIDE: SYNC,
    DETAIL: {
      CYCLE: SYNC,
    },
  },
});

export default types;
