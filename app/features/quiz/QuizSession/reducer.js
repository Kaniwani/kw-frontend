import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import { merge, union, difference } from 'lodash';

import { LOCATION_CHANGE } from 'react-router-redux';
import quiz from 'features/quiz/actions';

export const initialQuizSessionState = {
  category: '',
  wrapUp: false,
  synonymModalOpen: false,
  current: {},
  remaining: null,
  queue: [],
  correct: [],
  incorrect: [],
  complete: [],
};

const setCategory = (state, { payload }) =>
  update(state, {
    category: { $set: payload },
  });

// TODO: move to synonyms or info?
const setSynonymModalOpen = (state, { payload }) =>
  update(state, {
    synonymModalOpen: { $set: payload },
  });

const setWrapUp = (state, { payload }) =>
  update(state, {
    wrapUp: { $set: payload },
  });

const replaceCurrent = (state, { payload }) =>
  update(state, {
    current: { $set: payload },
    queue: { $set: difference(state.queue, [state.current.id]) },
  });

const mergeCurrent = (state, { payload }) =>
  update(state, {
    current: { $set: merge({}, state.current, payload) },
  });

const rotateCurrent = (state, { payload }) =>
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

const addIdToComplete = (state, { payload }) =>
  update(state, {
    complete: { $set: union(state.complete, [payload]) },
  });

const mergeQueue = (state, { payload }) =>
  update(state, {
    remaining: { $set: payload.remaining },
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
    // TODO: move to synonyms or info?
    [quiz.session.setSynonymModal]: setSynonymModalOpen,
    [quiz.session.setWrapUp]: setWrapUp,
    [quiz.session.queue.load.success]: mergeQueue,
    [quiz.session.queue.clear]: clearQueue,
    [quiz.session.current.replace]: replaceCurrent,
    [quiz.session.current.update]: mergeCurrent,
    [quiz.session.current.rotate]: rotateCurrent,
    [quiz.session.addCorrect]: addIdToCorrect,
    [quiz.session.addIncorrect]: addIdToIncorrect,
    [quiz.session.addComplete]: addIdToComplete,
    [LOCATION_CHANGE]: () => initialQuizSessionState,
  },
  initialQuizSessionState
);

export default quizSessionReducer;
