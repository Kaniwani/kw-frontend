import { createLogic } from 'redux-logic';

import vocab from './actions';

const reportVocabLogic = createLogic({
  type: vocab.report.request,
  process: ({ api, action }, dispatch, done) => {
    const { form } = action.meta;
    form.startSubmit();
    api.report
      .create(action.payload)
      .then(() => {
        form.setSubmitSucceeded();
        form.reset();
        dispatch(vocab.report.success());
        done();
      })
      .catch((err) => {
        form.setSubmitFailed();
        dispatch(vocab.report.failure(err));
        done();
      });
  },
});

export default [reportVocabLogic];
