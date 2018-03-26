import { createLogic } from 'redux-logic';
import { sample, difference } from 'lodash';

import { INITIAL_QUEUE_LIMIT, SUBSEQUENT_QUEUE_LIMIT } from './constants';

import { app } from 'common/actions';
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
  process({ api, serializers, getState, action: { payload } }, dispatch, done) {
    const { serializeQueueResponse } = serializers;
    const category = payload || selectCategory(getState());
    const currentId = selectCurrentId(getState());
    const queueCount = selectQueueCount(getState());
    const wrapUp = selectWrapUp(getState());
    // NOTE: smaller subsequent loads allow incorrect items to be recycled into questions more often
    const limit = wrapUp.active
      ? wrapUp.count - queueCount
      : !queueCount ? INITIAL_QUEUE_LIMIT : SUBSEQUENT_QUEUE_LIMIT;

    api.queue.fetch[category]({ limit })
      .then((res) => {
        dispatch(quiz.session.queue.load.success(serializeQueueResponse(res)));
        if (!currentId) {
          dispatch(quiz.session.current.replace());
        }
        done();
      })
      .catch((err) => {
        // FIXME: dispatch quiz timeout if seems like connection error
        dispatch(app.captureError(err, { category, queueCount }));
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
      next({ ...action, payload: {} });
    } else {
      const newReview = selectReviewById(getState(), { id: newId });
      next({ ...action, payload: newReview });
    }
  },
});

export const returnCurrentLogic = createLogic({
  type: [quiz.session.current.rotate],
  transform({ getState, action }, allow, reject) {
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
