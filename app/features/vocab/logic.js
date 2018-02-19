import { createLogic } from 'redux-logic';

import vocab from './actions';

const reportVocabLogic = createLogic({
  type: vocab.report.request,
  process: ({ api, action }, dispatch, done) => {
    api.report
      .send(action.payload)
      .then(() => {
        dispatch(vocab.report.success());
        done();
      })
      .catch((err) => {
        dispatch(vocab.report.failure(err));
        done();
      });
  },
});

export default [reportVocabLogic];
