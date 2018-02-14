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
  selectWrapUp,
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
    const wrapUp = selectWrapUp(getState());
    const limit = wrapUp.active
      ? wrapUp.count - queueCount
      : !queueCount ? INITIAL_QUEUE_LIMIT : SUBSEQUENT_QUEUE_LIMIT;
    // NOTE: smaller subsequent loads allow incorrect items to be recycled into questions more often
    api.queue.fetch[category]({ limit })
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
  transform({ getState, action }, next) {
    const currentId = selectCurrentId(getState());
    const queue = selectQueue(getState());
    const newId = sample(difference(queue, [currentId]));
    if (newId == null) {
      console.warn('no new id when trying to replace current', currentId, queue, newId);
      next(action);
    } else {
      const newReview = selectReviewById(getState(), { id: newId });
      next({ ...action, payload: newReview });
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
      console.log('allowing rotate');
      allow({ ...action, payload: { newCurrent, currentId } });
    } else {
      console.log('rejecting rotate');
      reject();
    }
  },
});

export default [queueLoadLogic, replaceCurrentLogic, returnCurrentLogic];
