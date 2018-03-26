import { createLogic } from 'redux-logic';

import { app } from 'common/actions';
import vocab from 'features/vocab/actions';
import user from 'features/user/actions';
import notify from 'features/notifications/actions';
import { selectVocabLevelsSubmitting } from 'features/vocab/Levels/selectors';

export const levelLoadLogic = createLogic({
  type: vocab.level.load.request,
  warnTimeout: 10000,
  process({ api, serializers: { serializeLevelResponse }, action: { payload } }, dispatch, done) {
    const { id } = payload;
    api.reviews
      .search({
        level: id,
        limit: 200,
      })
      .then((res) => {
        dispatch(vocab.level.load.success(serializeLevelResponse(res), { id }));
        done();
      })
      .catch((err) => {
        dispatch(app.captureError(err, payload));
        dispatch(
          notify.error({
            content: `Level ${id} failed to load. You may be experiencing connection problems.`,
          })
        );
        dispatch(vocab.level.load.failure(err, { id }));
        done();
      });
  },
});

export const levelLockLogic = createLogic({
  type: vocab.level.lock.request,
  warnTimeout: 10000,
  process({ api, action: { payload } }, dispatch, done) {
    const { id } = payload;
    api.vocab.level
      .lock({ id })
      .then(() => {
        dispatch(vocab.level.lock.success({ id }));
        setTimeout(() => {
          dispatch(user.quizCounts.request());
          done();
        }, 1000);
      })
      .catch((err) => {
        dispatch(app.captureError(err, payload));
        dispatch(
          notify.error({
            content: `Unable to lock level ${id}. Please try again or contact us if the problem persists.`,
          })
        );
        dispatch(vocab.level.lock.failure(err));
        done();
      });
  },
});

export const levelUnlockLogic = createLogic({
  type: vocab.level.unlock.request,
  warnTimeout: 10000,
  validate({ getState, action }, allow, reject) {
    const isAlreadySubmitting = selectVocabLevelsSubmitting(getState()).length >= 1;
    if (isAlreadySubmitting) {
      reject(
        notify.info({ content: 'Please wait for current unlock to complete.', duration: 3000 })
      );
    } else {
      allow(action);
    }
  },
  process({ api, action: { payload } }, dispatch, done) {
    const { id } = payload;

    api.vocab.level
      .unlock({ id })
      .then(() => {
        dispatch(vocab.level.unlock.success({ id }));
        setTimeout(() => dispatch(user.quizCounts.request()), 1000);
        setTimeout(() => {
          dispatch(vocab.level.load.request({ id }));
          done();
        }, 2000);
      })
      .catch((err) => {
        dispatch(app.captureError(err, payload));
        dispatch(
          notify.error({
            content: `Unable to unlock level ${id}. Please try again or contact us if the problem persists.`,
          })
        );
        dispatch(vocab.level.unlock.failure(err));
        done();
      });
  },
});

export default [levelLoadLogic, levelLockLogic, levelUnlockLogic];
