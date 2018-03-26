import { createLogic } from 'redux-logic';

import { app } from 'common/actions';
import notify from 'features/notifications/actions';
import vocab from './actions';

const reportVocabLogic = createLogic({
  type: vocab.report.request,
  process: ({ api, action: { payload, meta } }, dispatch, done) => {
    const { form } = meta;
    form.startSubmit();
    api.report
      .create(payload)
      .then(() => {
        form.setSubmitSucceeded();
        form.reset();
        dispatch(vocab.report.success());
        done();
      })
      .catch((err) => {
        form.setSubmitFailed();
        dispatch(
          notify.error({
            content: 'Unable to send report. You may be experiencing connection problems.',
          })
        );
        dispatch(app.captureError(err, payload));
        dispatch(vocab.report.failure(err));
        done();
      });
  },
});

export default [reportVocabLogic];
