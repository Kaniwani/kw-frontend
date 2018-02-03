import { createLogic } from 'redux-logic';

import synonym from './actions';

export const addSynonymLogic = createLogic({
  type: synonym.add.request,
  warnTimeout: 10000,
  process({ api, serializers, action }, dispatch, done) {
    // change to server naming format
    const { reviewId: review, word: character, reading: kana } = action.payload;
    const { form } = action.meta;
    form.startSubmit();
    api.synonym
      .create({ review, character, kana })
      .then((res) => {
        dispatch(synonym.add.success(serializers.serializeAddSynonymResponse(res)));
        form.setSubmitSucceeded();
        form.reset();
        done();
      })
      .catch((err) => {
        dispatch(synonym.add.failure(err));
        form.setSubmitFailed({ _error: err });
        done();
      });
  },
});

export const removeSynonymLogic = createLogic({
  type: synonym.remove.request,
  warnTimeout: 10000,
  processOptions: {
    successType: synonym.remove.success,
    failType: synonym.remove.failure,
  },

  process({ api, action }) {
    const { id, reviewId } = action.payload;
    return api.synonym.remove({ id }).then(() => ({ id, reviewId }));
  },
});

export default [addSynonymLogic, removeSynonymLogic];
