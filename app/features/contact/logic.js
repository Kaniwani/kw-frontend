import { createLogic } from 'redux-logic';

import { contact } from './actions';
import { app } from 'common/actions';

export const sendLogic = createLogic({
  type: contact.send.request,
  warnTimeout: 10000,
  throttle: 2000,
  process({ api, action: { payload, meta: { form } } }, dispatch, done) {
    form.startSubmit();
    api.contact
      .send(payload)
      .then(() => {
        form.stopSubmit();
        form.reset();
        dispatch(contact.send.success());
        done();
      })
      .catch((err) => {
        dispatch(app.captureError(err, payload));
        dispatch(contact.send.failure(err));
        form.stopSubmit();
        form.reset();
        done();
      });
  },
});

export default [sendLogic];
