import { createActions } from "redux-actions";
import { SYNC, ASYNC } from "common/actions";

export const { quiz } = createActions({
  QUIZ: {
    SUMMARY: {
      RESET: SYNC,
      CORRECT: {
        ADD: SYNC,
        REMOVE: SYNC,
      },
      INCORRECT: {
        ADD: SYNC,
        REMOVE: SYNC,
      },
    },
    SESSION: {
      SET_CATEGORY: SYNC,
      QUEUE: {
        LOAD: ASYNC,
        CLEAR: SYNC,
      },
      CURRENT: {
        SET: SYNC,
        UPDATE: SYNC,
        RETURN: SYNC,
      },
      CORRECT: {
        ADD: SYNC,
        REMOVE: SYNC,
      },
      INCORRECT: {
        ADD: SYNC,
        REMOVE: SYNC,
      },
    },
    QUESTION: {
      ADVANCE: SYNC,
    },
    ANSWER: {
      UPDATE: SYNC,
      CHECK: SYNC,
      CORRECT: SYNC,
      INCORRECT: SYNC,
      IGNORE: SYNC,
      SUBMIT: SYNC,
      RECORD: ASYNC,
      RESET: SYNC,
    },
    INFO: {
      UPDATE: SYNC,
      CYCLEDETAIL: SYNC,
      RESET: SYNC,
    },
  },
});

export default quiz;
