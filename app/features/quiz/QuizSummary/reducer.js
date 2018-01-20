import { handleActions } from 'redux-actions';
import { union } from 'lodash';
import update from 'immutability-helper';

import user from 'features/user/actions';
import quiz from 'features/quiz/actions';

const initialState = {
  lessons: {
    correct: [],
    incorrect: [],
    lastActivityDate: false,
  },
  reviews: {
    correct: [],
    incorrect: [],
    lastActivityDate: false,
  },
};

export const quizSummaryReducer = handleActions(
  {
    [quiz.summary.addCorrect]: (state, { payload, meta: { category } }) =>
      update(state, {
        [category]: {
          correct: { $set: union(state[category].correct, [payload]) },
          lastActivityDate: { $set: new Date() },
        },
      }),
    [quiz.summary.addIncorrect]: (state, { payload, meta: { category } }) =>
      update(state, {
        [category]: {
          incorrect: { $set: union(state[category].incorrect, [payload]) },
          lastActivityDate: { $set: new Date() },
        },
      }),
    [quiz.summary.reset]: (state, { meta: { category } }) =>
      update(state, {
        [category]: {
          correct: { $set: [] },
          incorrect: { $set: [] },
        },
      }),
    [user.logout]: () => initialState,
  },
  initialState
);

export default quizSummaryReducer;
