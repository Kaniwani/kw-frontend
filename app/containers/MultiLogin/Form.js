import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { reduxForm, SubmissionError, Field } from 'redux-form';
import { Redirect } from 'react-router-dom';

import { hasToken, setToken } from 'utils/auth';

import {
  registerUser,
  loginUser,
  resetPassword,
} from 'shared/api';

import {
  requiredValid,
  emailValid,
  passwordValid,
  valueMatches,
} from 'shared/validations';

import {
  selectActivePanel,
  selectLoginSelected,
  selectResetSelected,
  selectRegisterSelected,
  selectMainInputName,
  selectMainInputText,
} from './selectors';

import Input from './Input';

import {
  Form,
  SubmitButton,
  ApiLink,
  ValidationMessage,
} from './styles';

FormView.propTypes = {
  loginSelected: PropTypes.bool.isRequired,
  registerSelected: PropTypes.bool.isRequired,
  resetSelected: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  mainInputName: PropTypes.string.isRequired,
  mainInputText: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.array,
};

function FormView({
  handleSubmit,
  loginSelected,
  registerSelected,
  resetSelected,
  mainInputName,
  mainInputText,
  error,
  submitting,
 }) {
  if (hasToken()) {
    return <Redirect to="/" />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label={`Enter ${mainInputName}`}
        name={mainInputName}
        component={Input}
        placeholder={mainInputText}
      />
      <Field
        label="Enter email"
        name="email"
        component={Input}
        type="email"
        placeholder="Email"
        isHidden={loginSelected || resetSelected}
      />
      <Field
        label="Enter account password"
        name="password"
        component={Input}
        type="password"
        placeholder="Password"
        isHidden={resetSelected}
      />
      <Field
        label="Confirm account password"
        name="confirmPassword"
        component={Input}
        type="password"
        placeholder="Confirm Password"
        isHidden={loginSelected || resetSelected}
      />
      <Field
        label="Enter WaniKani API key"
        name="apiKey"
        component={Input}
        placeholder="WaniKani API key"
        isHidden={loginSelected || resetSelected}
      >
        <ApiLink
          title="Get WK API key"
          name="HELP"
          color="black"
          href="https://www.wanikani.com/settings/account#public-api-key"
          isHidden={loginSelected || resetSelected}
          external
        />
      </Field>
      {error && <ValidationMessage>{error}</ValidationMessage>}
      <SubmitButton type="submit">
        {(submitting && 'Submitting') ||
        (registerSelected && 'Create Account') ||
        (loginSelected && '行こう') ||
        (resetSelected && 'Reset Password')}
      </SubmitButton>
    </Form>
  );
}

const mapStateToProps = createStructuredSelector({
  activePanel: selectActivePanel,
  loginSelected: selectLoginSelected,
  resetSelected: selectResetSelected,
  registerSelected: selectRegisterSelected,
  mainInputName: selectMainInputName,
  mainInputText: selectMainInputText,
});


const handleSubmissionResponse = (res) => {
  console.log('submission response', res);
};

const handleSubmissionError = (err) => {
  console.warn('submission error', err);
  const errors = { ...err.body, apiKey: err.body.api_key, _error: err.body.non_field_errors };
  throw new SubmissionError(errors);
};

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'multiLogin',
    onSubmit: (values, dispatch, props) => {
      const { username, email, password, confirmPassword, apiKey } = values;
      const { loginSelected, registerSelected, resetSelected } = props;

      if (loginSelected) {
        // FIXME: dispatch login instead (which sets token and redirect) so register can use dispatch login
        return loginUser({ username, password })
          .then(({ body: { token } }) => {
            setToken(token);
          })
          .catch(handleSubmissionError);
      }

      if (registerSelected) {
        const errors = {
          username: requiredValid(username),
          email: emailValid(email),
          password: passwordValid(password) || valueMatches(password, confirmPassword),
          confirmPassword: passwordValid(confirmPassword) || valueMatches(password, confirmPassword),
          apiKey: requiredValid(apiKey),
        };
        if (Object.values(errors).some(Boolean)) {
          throw new SubmissionError(errors);
        } else {
          return registerUser({ username, email, password, apiKey })
            .then(() => loginUser({ username, password }).then(({ body: { token } }) => {
              setToken(token);
            }))
            .catch(handleSubmissionError);
        }
      }

      if (resetSelected) {
        return resetPassword({ email })
          .then(handleSubmissionResponse)
          .catch(handleSubmissionError);
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
