import { createLogic } from 'redux-logic';

import vocab from 'features/vocab/actions';
import user from 'features/user/actions';
import { selectVocabLevelsSubmitting } from 'features/vocab/Levels/selectors';

export const levelLoadLogic = createLogic({
  type: vocab.level.load.request,
  warnTimeout: 10000,
  process({ api, serializers, action }, dispatch, done) {
    const { payload: { id } } = action;
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
      .catch(({ status, response, message, ...rest }) => {
        dispatch(vocab.level.load.failure({ status, response, message, ...rest }, { id }));
        done();
      });
  },
});

export const levelLockLogic = createLogic({
  type: vocab.level.lock.request,
  warnTimeout: 10000,
  process({ api, action }, dispatch, done) {
    const { payload: { id } } = action;
    api.vocab.level
      .lock({ id })
      .then(() => {
        dispatch(vocab.level.lock.success({ id }));
        dispatch(user.load.request()); // update review counts due to locking
        done();
      })
      .catch(({ status, response, message, ...rest }) => {
        dispatch(vocab.level.lock.failure({ status, response, message, ...rest }));
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
      // FIXME: create a queue
      alert('Please unlock levels one at a time.');
      reject();
    } else {
      allow(action);
    }
  },
  process({ api, action }, dispatch, done) {
    const { payload: { id } } = action;

    api.vocab.level
      .unlock({ id })
      .then(() => {
        dispatch(vocab.level.unlock.success({ id }));
        // TODO: preload level's reviews in advance since user will likely view them now
        dispatch(vocab.level.load.request({ id }));
        dispatch(user.load.request()); // update review counts due to unlocking
        done();
      })
      .catch(({ status, response, message, ...rest }) => {
        dispatch(vocab.level.unlock.failure({ status, response, message, ...rest }));
        done();
      });
  },
});

export default [levelLoadLogic, levelLockLogic, levelUnlockLogic];
