import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import { merge, union, difference } from 'lodash';

import { LOCATION_CHANGE } from 'react-router-redux';
import quiz from 'features/quiz/actions';

export const initialQuizSessionState = {
  category: '',
  current: {},
  queue: [],
  correct: [],
  incorrect: [],
};

const setCategory = (state, { payload }) =>
  update(state, {
    category: { $set: payload },
  });

const setCurrent = (state, { payload }) =>
  update(state, {
    current: { $set: payload },
    queue: { $set: difference(state.queue, [payload.id]) },
  });

const mergeCurrent = (state, { payload }) =>
  update(state, {
    current: { $set: merge({}, state.current, payload) },
  });

// FIXME: untested => should return id to queue, set new current as current,
const returnCurrent = (state, { payload }) =>
  update(state, {
    current: { $set: payload.newCurrent },
    queue: { $set: union(state.queue, [payload.currentId]) },
  });

const addIdToCorrect = (state, { payload }) =>
  update(state, {
    correct: { $set: union(state.correct, [payload]) },
  });

const addIdToIncorrect = (state, { payload }) =>
  update(state, {
    incorrect: { $set: union(state.incorrect, [payload]) },
  });

const mergeQueue = (state, { payload }) =>
  update(state, {
    queue: {
      $set: union(state.queue, difference(payload.reviewIds, state.current.id)),
    },
  });

const clearQueue = (state) =>
  update(state, {
    queue: {
      $set: [],
    },
  });

export const quizSessionReducer = handleActions(
  {
    [quiz.session.setCategory]: setCategory,
    [quiz.session.queue.load.success]: mergeQueue,
    [quiz.session.queue.clear]: clearQueue,
    [quiz.session.current.set]: setCurrent,
    [quiz.session.current.update]: mergeCurrent,
    [quiz.session.current.return]: returnCurrent,
    [quiz.session.correct.add]: addIdToCorrect,
    [quiz.session.incorrect.add]: addIdToIncorrect,
    [LOCATION_CHANGE]: () => initialQuizSessionState,
  },
  initialQuizSessionState
);

export default quizSessionReducer;
