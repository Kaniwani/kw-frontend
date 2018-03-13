import { createLogic } from 'redux-logic';

import { app } from 'common/actions';
import vocab from 'features/vocab/actions';
import user from 'features/user/actions';
import { selectVocabLevelsSubmitting } from 'features/vocab/Levels/selectors';

export const levelLoadLogic = createLogic({
  type: vocab.level.load.request,
  warnTimeout: 10000,
  process({ api, serializers, action: { payload } }, dispatch, done) {
    const { id } = payload;
    api.reviews
      .search({
        level: id,
        limit: 200,
      })
      .then((response) => {
        const level = serializers.serializeLevelResponse(response);
        dispatch(vocab.level.load.success(level, { id }));
        done();
      })
      .catch((err) => {
        dispatch(app.captureError(err, payload));
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
        dispatch(user.load.request()); // update review counts due to locking
        done();
      })
      .catch((err) => {
        dispatch(app.captureError(err, payload));
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
      alert('Please unlock levels one at a time.');
      reject();
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
        // TODO: preload level's reviews in advance since user will likely view them now
        dispatch(vocab.level.load.request({ id }));
        dispatch(user.load.request()); // update review counts due to unlocking
        done();
      })
      .catch((err) => {
        dispatch(app.captureError(err, payload));
        dispatch(vocab.level.unlock.failure(err));
        done();
      });
  },
});

export default [levelLoadLogic, levelLockLogic, levelUnlockLogic];
