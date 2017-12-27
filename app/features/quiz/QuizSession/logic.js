import { createLogic } from 'redux-logic';
import { sample, difference } from 'lodash';

import quiz from 'features/quiz/actions';
import { selectReviewById } from 'features/reviews/selectors';
import {
  selectCategory,
  selectQueue,
  selectQueueCount,
  selectCurrent,
  selectCorrectIds,
  selectCurrentId,
} from './selectors';

export const queueLoadLogic = createLogic({
  type: quiz.session.queue.load.request,
  warnTimeout: 10000,
  latest: true,

  validate({ getState, action }, allow, reject) {
    const hasEnoughQueue = selectQueueCount(getState()) > 5;
    if (hasEnoughQueue) {
      reject();
    }
    allow(action);
  },

  process({ api, serializers, getState, action }, dispatch, done) {
    const { serializeQueueResponse } = serializers;
    const category = action.payload;
    const currentId = selectCurrentId(getState());
    const queue = selectQueue(getState());

    api.queue.fetch[category]({
      limit: 10,
    })
      .then((res) => {
        dispatch(quiz.session.queue.load.success(serializeQueueResponse(res)));
        if (!currentId) {
          dispatch(quiz.session.current.set());
        }
        done();
      })
      .catch((err) => {
        dispatch(quiz.session.queue.load.failure(err));
        done();
      });
  },
});

// prettier-ignore
export const setCurrentLogic = createLogic({
  type: quiz.session.current.set,
  validate({ getState, action }, allow, reject) {
    const currentId = selectCurrentId(getState());
    const queue = selectQueue(getState());
    const correct = selectCorrectIds(getState());
    const newId = sample(difference(queue, [currentId]));
    console.log('current.set logic:');
    console.log({ currentId, queue, correct, newId });
    if (newId || queue.length) {
      const newCurrent = selectReviewById(getState(), { id: newId });
      allow({ ...action, payload: newCurrent });
    }
    if (!newId && currentId && !correct.includes(currentId)) {
      console.log('Rejecting setCurrent: current was the only remaining item:');
      console.log({
        queue,
        currentId,
        newId,
      });
    }
    // FIXME: think we need to (create a new action) and dispatch [category]current.clear()
    // that clears current in common/reducers (not sure whether it needs to clear queue as well?)
    if (!newId) {
      console.log('No new id... End of queue?');
      allow({ ...action, payload: { id: undefined } });
    }
    reject();
  },
});

// prettier-ignore
export const returnCurrentLogic = createLogic({
  type: [quiz.session.current.return],
  validate({ getState, action }, allow, reject) {
    const currentId = selectCurrentId(getState());
    const queue = selectQueue(getState());
    const newId = sample(difference(queue, [currentId]));
    console.log('current.return logic:');
    console.log({ currentId, queue, newId });

    if (newId) {
      const newCurrent = selectReviewById(getState(), { id: newId });
      console.log({ newCurrent });
      allow({ ...action, payload: { newCurrent, currentId } });
    } else {
      console.log('Rejected returning current - no other queue items', {
        queue,
        currentId,
        newId,
      });
      // FIXME: should this ONLY be in else condition for newId check? or at end of function?
      reject();
    }
  },
});

export default [queueLoadLogic, setCurrentLogic, returnCurrentLogic];
