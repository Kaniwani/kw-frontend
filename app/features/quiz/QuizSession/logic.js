import { createLogic } from 'redux-logic';
import { sample, difference } from 'lodash';

import { INITIAL_QUEUE_LIMIT, SUBSEQUENT_QUEUE_LIMIT } from './constants';

import quiz from 'features/quiz/actions';
import { selectReviewById } from 'features/reviews/selectors';
import {
  selectQueue,
  selectQueueCount,
  selectCategory,
  selectQueueNeeded,
  selectCorrectIds,
  selectCurrentId,
} from './selectors';

export const queueLoadLogic = createLogic({
  type: quiz.session.queue.load.request,
  warnTimeout: 10000,
  latest: true,
  validate({ getState, action }, allow, reject) {
    if (selectQueueNeeded(getState())) {
      allow(action);
    } else {
      reject();
    }
  },
  process({ api, serializers, getState, action }, dispatch, done) {
    const { serializeQueueResponse } = serializers;
    const category = action.payload || selectCategory(getState());
    const currentId = selectCurrentId(getState());
    const queueCount = selectQueueCount(getState());

    api.queue.fetch[category]({
      // NOTE: smaller subsequent loads allow incorrect items to be recycled into questions more often
      limit: !queueCount ? INITIAL_QUEUE_LIMIT : SUBSEQUENT_QUEUE_LIMIT,
    })
      .then((res) => {
        dispatch(quiz.session.queue.load.success(serializeQueueResponse(res)));
        if (!currentId) {
          dispatch(quiz.session.current.replace());
        }
        done();
      })
      .catch((err) => {
        dispatch(quiz.session.queue.load.failure(err));
        done();
      });
  },
});

export const replaceCurrentLogic = createLogic({
  type: quiz.session.current.replace,
  validate({ getState, action }, allow, reject) {
    const currentId = selectCurrentId(getState());
    const queue = selectQueue(getState());
    const correct = selectCorrectIds(getState());
    const newId = sample(difference(queue, [currentId]));
    console.log('current.replace logic:');
    console.log({ currentId, queue, correct, newId });
    if (newId || queue.length) {
      console.log('Allowing replaceCurrent with newId:');
      console.log({ newId, queue });
      const newCurrent = selectReviewById(getState(), { id: newId });
      allow({ ...action, payload: newCurrent });
    } else if (!newId && currentId && !correct.includes(currentId)) {
      console.log('Rejecting replaceCurrent: current was the only remaining item:');
      console.log({
        queue,
        currentId,
        newId,
      });
      reject();
    } else if (!newId) {
      console.log('Rejecting replaceCurrent: No new id... End of queue?');
      console.log({ newId, queue });
      reject();
    }
  },
});

export const returnCurrentLogic = createLogic({
  type: [quiz.session.current.rotate],
  validate({ getState, action }, allow, reject) {
    const queue = selectQueue(getState());
    const currentId = selectCurrentId(getState());
    const newId = sample(difference(queue, [currentId]));

    if (newId) {
      const newCurrent = selectReviewById(getState(), { id: newId });
      allow({ ...action, payload: { newCurrent, currentId } });
    } else {
      reject();
    }
  },
});

export default [queueLoadLogic, replaceCurrentLogic, returnCurrentLogic];
