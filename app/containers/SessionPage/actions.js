import { createActions } from 'redux-actions';

const actionCreators = [
  (payload) => payload,
  (payload, meta) => meta,
];

const SYNC = actionCreators;

const ASYNC = {
  REQUEST: actionCreators,
  SUCCESS: actionCreators,
  CANCEL: actionCreators,
  FAILURE: actionCreators,
};

export const { quiz } = createActions({
  QUIZ: {
    ANSWER: {
      SUBMIT: SYNC,
      UPDATE: SYNC,
      IGNORE: SYNC,
      RESET: SYNC,
      RECORD: ASYNC,
    },
  },
});

export default quiz;
