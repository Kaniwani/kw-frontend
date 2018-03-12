import { createLogic } from 'redux-logic';
import { contact } from './actions';
import Raven from 'common/raven';

export const sendLogic = createLogic({
  type: contact.send.request,
  warnTimeout: 10000,
  throttle: 2000,
  process({ api, action }, dispatch, done) {
    const { form } = action.meta;
    form.startSubmit();
    api.contact
      .send(action.payload)
      .then(() => {
        form.stopSubmit();
        form.reset();
        dispatch(contact.send.success());
        done();
      })
      .catch((error) => {
        Raven.captureException(error, { extra: { ...action.payload } });
        dispatch(contact.send.failure(error));
        form.stopSubmit();
        form.reset();
        done();
      });
  },
});

export default [sendLogic];
