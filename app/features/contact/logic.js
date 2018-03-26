import { createLogic } from 'redux-logic';

import { contact } from './actions';
import { app } from 'common/actions';
import notify from 'features/notifications/actions';

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
        dispatch(notify.success({ content: 'Thanks for the message!', duration: 3000 }));
        done();
      })
      .catch((err) => {
        dispatch(app.captureError(err, payload));
        dispatch(contact.send.failure(err));
        dispatch(
          notify.error({
            content: `Something went wrong sending your message. An error report has been captured and we’ll get in touch with you at ${
              payload.email
            }`,
          })
        );
        form.stopSubmit();
        form.reset();
        done();
      });
  },
});

export default [sendLogic];
