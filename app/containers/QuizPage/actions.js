import { createActions } from 'redux-actions';

const actionSignature = (payload) => payload;

const SYNC = actionSignature;

const ASYNC = {
  REQUEST: actionSignature,
  SUCCESS: actionSignature,
  CANCEL: actionSignature,
  FAILURE: actionSignature,
};

export const { quiz } = createActions({
  QUIZ: {
    ADVANCE: SYNC,
    INFO: {
      UPDATE: SYNC,
      CYCLEDETAIL: SYNC,
      RESET: SYNC,
    },
    BACKUP: {
      SET: SYNC,
      RESET: SYNC,
    },
    ANSWER: {
      UPDATE: SYNC,
      SUBMIT: SYNC,
      CHECK: SYNC,
      CORRECT: SYNC,
      INCORRECT: SYNC,
      IGNORE: SYNC,
      RESET: SYNC,
      RECORD: ASYNC,
    },
  },
});

export default quiz;
