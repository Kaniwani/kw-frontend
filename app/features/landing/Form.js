import React from "react";
import PropTypes from "prop-types";
import { compose, lifecycle } from "recompose";
import { reduxForm, Field } from "redux-form";

import user from "features/user/actions";
import Spinner from "common/components/Spinner";

import {
  requiredValid,
  emailValid,
  minLengthValid,
  confirmPasswordValid,
} from "common/validations";

import Input from "./Input";

import { Form, SubmitButton, ApiLink, ValidationMessage } from "./styles";

FormView.propTypes = {
  loginSelected: PropTypes.bool.isRequired,
  registerSelected: PropTypes.bool.isRequired,
  resetSelected: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.array,
};

FormView.defaultProps = {
  error: [],
};

function FormView({
  loginSelected,
  registerSelected,
  resetSelected,
  handleSubmit,
  submitting,
  error,
}) {
  const mainInputText =
    (loginSelected && "Username or Email") || (registerSelected && "Username") || "Email";

  return (
    <Form onSubmit={handleSubmit} autoComplete="on">
      <Field
        label={`Enter ${!resetSelected ? "username" : "email"}`}
        name={!resetSelected ? "username" : "email"}
        component={Input}
        placeholder={mainInputText}
        validate={!resetSelected ? [requiredValid] : [requiredValid, emailValid]}
      />
      <Field
        label="Enter email"
        name="email"
        component={Input}
        type="email"
        placeholder="Email"
        validate={registerSelected ? [requiredValid, emailValid] : []}
        isHidden={loginSelected || resetSelected}
      />
      <Field
        label="Enter account password"
        name="password"
        component={Input}
        type="password"
        placeholder="Password"
        validate={!resetSelected ? [requiredValid, minLengthValid] : []}
        isHidden={resetSelected}
      />
      <Field
        label="Confirm account password"
        name="confirmPassword"
        component={Input}
        type="password"
        placeholder="Confirm Password"
        validate={
          registerSelected ? [requiredValid, minLengthValid, confirmPasswordValid] : []
        }
        isHidden={loginSelected || resetSelected}
      />
      <Field
        label="WaniKani V1 API Key"
        name="apiKey"
        component={Input}
        placeholder="WaniKani V1 API Key"
        validate={registerSelected ? [requiredValid] : []}
        isHidden={loginSelected || resetSelected}
      >
        <ApiLink
          title="Find WK API Key"
          name="HELP"
          color="black"
          href="https://www.wanikani.com/settings/account#public-api-key"
          isHidden={loginSelected || resetSelected}
          tabIndex={loginSelected || resetSelected ? -1 : 0}
          external
        />
      </Field>
      {error.length > 0 && <ValidationMessage>{error}</ValidationMessage>}
      <SubmitButton
        type="submit"
        lang="ja"
        title={
          (submitting && "Submitting...") ||
          (registerSelected && "Register") ||
          (loginSelected && "Let's Go!") ||
          (resetSelected && "Submit")
        }
      >
        {(submitting && "送信している...") ||
          (registerSelected && "登録する") ||
          (loginSelected && "行こう") ||
          (resetSelected && "送信する")}
      </SubmitButton>
      {registerSelected && submitting && <Spinner />}
    </Form>
  );
}

export const FORM_NAME = "multiLogin";
const enhance = compose(
  reduxForm({
    form: FORM_NAME,
    onSubmit: (values, dispatch, props) => {
      const { loginSelected, registerSelected, resetSelected } = props;
      const { username, email, password, apiKey } = values;

      if (registerSelected) {
        dispatch(
          user.register.request({
            username,
            email,
            password,
            api_key: apiKey,
          })
        );
      }

      if (loginSelected) {
        dispatch(user.login.request({ username, password }));
      }

      if (resetSelected) {
        // FIXME: this step works, but we don't have a confirmation in place yet
        // dispatch(user.resetPassword.request({ email }));
        window.alert("Temporarily disabled - please contact us to reset your password.");
      }
    },
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      // reset form if user changes panel and there are lingering general submission errors
      if (prevProps.activePanel !== this.props.activePanel && this.props.error) {
        this.props.reset();
      }
    },
  })
);

export default enhance(FormView);
