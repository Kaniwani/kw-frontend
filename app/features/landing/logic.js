import { createLogic } from "redux-logic";
import { actions as formActions } from "redux-form";
import { user } from "features/user/actions";
import { setToken } from "common/utils/auth";
import { camelCaseKeys } from "common/utils/caseKeys";

const { startSubmit, stopSubmit } = formActions;
import { FORM_NAME } from "./Form";

export const registerLogic = createLogic({
  type: user.register.request,
  process({ api, action: { payload } }, dispatch, done) {
    dispatch(startSubmit(FORM_NAME));
    api.user
      .register(payload)
      .then(() => {
        dispatch(user.login.request(payload));
        dispatch(stopSubmit(FORM_NAME));
        done();
      })
      .catch((error) => {
        const { json } = error;
        const errors = camelCaseKeys(json || {});
        dispatch(
          stopSubmit(FORM_NAME, {
            ...errors,
            _error: errors.non_field_errors && errors.non_field_errors,
          })
        );
        dispatch(user.register.failure(error));
        console.warn(`Register failure. Response error was: ${JSON.stringify(error)}`);
        done();
      });
  },
});

export const loginLogic = createLogic({
  type: user.login.request,
  process({ api, history, action: { payload } }, dispatch, done) {
    dispatch(startSubmit(FORM_NAME));
    api.user
      .login(payload)
      .then(({ token }) => {
        setToken(token);
        dispatch(user.login.success());
        history.push("/");
        done();
      })
      .catch((error) => {
        dispatch(
          stopSubmit(FORM_NAME, { ...error.json, _error: error.json.non_field_errors })
        );
        dispatch(user.login.failure(error.json));
        console.warn(`Login failure. Response was: ${JSON.stringify(error)}`);
        done();
      });
  },
});

export const resetPasswordLogic = createLogic({
  type: user.resetPassword.request,
  process({ api, action: { payload } }, dispatch, done) {
    dispatch(startSubmit(FORM_NAME));
    api
      .resetPassword(payload)
      .then((res) => {
        dispatch(user.resetPassword.success(res));
        dispatch(stopSubmit(FORM_NAME));
        // TODO: notify user
        done();
      })
      .catch((error) => {
        dispatch(stopSubmit(FORM_NAME, { ...error, _error: error.non_field_errors }));
        dispatch(user.resetPassword.failure(error));
        console.warn(`API failure. Response error was: ${JSON.stringify(error)}`);
        done();
      });
  },
});

export default [registerLogic, loginLogic, resetPasswordLogic];
