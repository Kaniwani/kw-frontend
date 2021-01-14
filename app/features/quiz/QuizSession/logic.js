import { createLogic } from 'redux-logic';
import { first, sample, difference } from 'lodash';

import { app } from 'common/actions';
import quiz from 'features/quiz/actions';
import { selectReviewById } from 'features/reviews/selectors';
import { selectOrderReviewsByLevel } from 'features/user/selectors';
import { INITIAL_QUEUE_LIMIT, SUBSEQUENT_QUEUE_LIMIT } from './constants';
import {
  selectQueue,
  selectQueueCount,
  selectSessionRemainingCount,
  selectCategory,
  selectQueueNeeded,
  selectWrapUp,
  selectCurrentId,
} from './selectors';

const getNextId = (queue = [], currentId, orderByLevel) => orderByLevel ? first(difference(queue, [currentId])) : sample(difference(queue, [currentId]));

export const queueLoadLogic = createLogic({
  type: quiz.session.queue.load.request,
  warnTimeout: 10000,
  latest: true,
  validate({ getState, action }, allow, reject) {
    if (selectQueueNeeded(getState())) {
      const category = selectCategory(getState());
      const currentId = selectCurrentId(getState());
      const queueCount = selectQueueCount(getState());
      const remainingCount = selectSessionRemainingCount(getState());
      const wrapUp = selectWrapUp(getState());
      // eslint-disable-next-line no-nested-ternary
      const limit = !queueCount
        ? INITIAL_QUEUE_LIMIT
        : wrapUp.active
          ? wrapUp.count
          : Math.min(remainingCount, SUBSEQUENT_QUEUE_LIMIT);
      allow({ ...action, payload: { category, limit, currentId } });
    } else {
      reject();
    }
  },
  process({ api, serializers, action }, dispatch, done) {
    const { serializeQueueResponse } = serializers;
    const { category, limit, currentId } = action.payload;

    api.queue.fetch[category]({ limit })
      .then((res) => {
        dispatch(quiz.session.queue.load.success(serializeQueueResponse(res)));
        if (!currentId) {
          dispatch(quiz.session.current.replace());
        }
        done();
      })
      .catch((err) => {
        dispatch(app.captureError(err, { currentId }));
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
    const orderByLevel = selectOrderReviewsByLevel(getState());
    const newId = getNextId(queue, currentId, orderByLevel);

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
    const currentId = selectCurrentId(getState());
    const queue = selectQueue(getState());
    const orderByLevel = selectOrderReviewsByLevel(getState());
    const newId = getNextId(queue, currentId, orderByLevel);

    if (newId != null) {
      const newCurrent = selectReviewById(getState(), { id: newId });
      allow({ ...action, payload: { newCurrent, currentId } });
    } else {
      reject();
    }
  },
});

export default [queueLoadLogic, replaceCurrentLogic, returnCurrentLogic];
