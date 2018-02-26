import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import { merge, union, difference } from 'lodash';
import { LOCATION_CHANGE } from 'react-router-redux';

import { WRAP_UP_STARTING_COUNT } from './constants';
import quiz from 'features/quiz/actions';

export const initialQuizSessionState = {
  active: false,
  category: '',
  wrapUp: { active: false, count: 10 },
  synonymModalOpen: false,
  current: {},
  queue: [],
  correct: [],
  incorrect: [],
  complete: [],
};

const setCategory = (state, { payload }) =>
  update(state, {
    category: { $set: payload },
  });

const setSynonymModalOpen = (state, { payload }) =>
  update(state, {
    synonymModalOpen: { $set: payload },
  });

const toggleWrapUp = (state) => {
  let { queue, incorrect } = state; // eslint-disable-line prefer-const
  let count = WRAP_UP_STARTING_COUNT;
  const active = !state.wrapUp.active;

  if (active) {
    const incorrectQueuePaddedToMinCount = incorrect
      .concat(difference(queue, incorrect))
      .slice(0, Math.max(incorrect.length, WRAP_UP_STARTING_COUNT));

    queue = incorrectQueuePaddedToMinCount;
    count = Math.max(queue.length, WRAP_UP_STARTING_COUNT);
  }

  return update(state, {
    wrapUp: {
      active: { $set: active },
      count: { $set: count },
    },
    queue: { $set: queue },
  });
};

const decrementWrapUp = (state) =>
  state.wrapUp.active
    ? update(state, {
      wrapUp: { count: { $set: Math.max(state.wrapUp.count - 1, 0) } },
    })
    : state;

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

const removeIdFromQueue = (state, { payload }) =>
  update(state, {
    queue: { $set: difference(state.queue, [payload]) },
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
    // TODO: move to synonyms or info?
    [quiz.session.setSynonymModal]: setSynonymModalOpen,
    [quiz.session.wrapUp.toggle]: toggleWrapUp,
    [quiz.session.wrapUp.decrement]: decrementWrapUp,
    [quiz.session.queue.load.success]: mergeQueue,
    [quiz.session.queue.remove]: removeIdFromQueue,
    [quiz.session.queue.clear]: clearQueue,
    [quiz.session.current.replace]: replaceCurrent,
    [quiz.session.current.update]: mergeCurrent,
    [quiz.session.current.rotate]: rotateCurrent,
    [quiz.session.addCorrect]: addIdToCorrect,
    [quiz.session.addIncorrect]: addIdToIncorrect,
    [quiz.session.addComplete]: addIdToComplete,
    [quiz.session.start]: () => ({ ...initialQuizSessionState, active: true }),
    [LOCATION_CHANGE]: (state) => ({ ...state, active: false }),
  },
  initialQuizSessionState
);

export default quizSessionReducer;
