import { createLogic } from 'redux-logic';

import vocab from './actions';

const reportVocabLogic = createLogic({
  type: vocab.report.request,
  process: ({ api, action }, dispatch, done) => {
    dispatch(api.report.send(action.payload));
    done();
  },
});

export default [reportVocabLogic];
