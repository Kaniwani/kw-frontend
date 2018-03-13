import { createLogic } from 'redux-logic';

import { app } from 'common/actions';
import user from 'features/user/actions';
import { setToken } from 'common/utils/auth';
import { camelCaseKeys } from 'common/utils/caseKeys';

export const registerLogic = createLogic({
  type: user.register.request,
  process({ api, action: { payload, meta: { form } } }, dispatch, done) {
    form.startSubmit();
    api.user
      .register(payload)
      .then(() => {
        dispatch(user.login.request(payload, {}));
        form.stopSubmit();
        done();
      })
      .catch((err) => {
        const { json } = err;
        const errors = camelCaseKeys(json || {});
        form.stopSubmit({
          ...errors,
          _error: errors.non_field_errors && errors.non_field_errors,
        });
        dispatch(user.register.failure(err));
        done();
      });
  },
});

export const loginLogic = createLogic({
  type: user.login.request,
  process({ api, history, action: { payload, meta: { form } } }, dispatch, done) {
    if (form) {
      form.startSubmit();
    }
    api.user
      .login(payload)
      .then(({ token }) => {
        setToken(token);
        dispatch(user.login.success());
        dispatch(user.load.request());
        history.push('/');
        done();
      })
      .catch((err) => {
        dispatch(user.login.failure(err));
        if (err.status && (err.status === 503 || err.status === 502)) {
          dispatch(app.setMaintenance(true));
        } else if (err.status && err.status === 400) {
          if (form) {
            form.stopSubmit({ ...err.json, _error: err.json.non_field_errors });
          }
        } else if (form) {
          form.stopSubmit({ _error: ['There was an error contacting the server.'] });
        }
        if (err.status !== 400) {
          dispatch(app.captureError(err, payload));
        }
        done();
      });
  },
});

export const resetPasswordLogic = createLogic({
  type: user.resetPassword.request,
  process({ api, action: { payload, meta: { form } } }, dispatch, done) {
    form.startSubmit();
    api.user
      .resetPassword(payload)
      .then(() => {
        dispatch(user.resetPassword.success());
        form.stopSubmit();
        // TODO: notification user to check email
        window.alert('Check your email to complete reset');
        done();
      })
      .catch((err) => {
        dispatch(app.captureError(err, payload));
        form.stopSubmit({ ...err, _error: err.non_field_errors });
        dispatch(user.resetPassword.failure(err));
        done();
      });
  },
});

export const confirmResetPasswordLogic = createLogic({
  type: user.confirmResetPassword.request,
  process({ api, action: { payload } }, dispatch, done) {
    api.user
      .confirmResetPassword(payload)
      .then(() => {
        dispatch(user.confirmResetPassword.success());
        window.alert('Password reset complete');
        done();
      })
      .catch((err) => {
        dispatch(app.captureError(err, payload));
        dispatch(user.confirmResetPassword.failure(err));
        done();
      });
  },
});

export default [registerLogic, loginLogic, resetPasswordLogic, confirmResetPasswordLogic];
