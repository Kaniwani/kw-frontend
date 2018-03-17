import React from 'react';
import { reduxForm, Field, propTypes as formPropTypes } from 'redux-form';

import user from 'features/user/actions';

import LandingPage from 'pages/LandingPage/Loadable';
import { requiredValid, minLengthValid } from 'common/validations';
import Input from 'features/landing/Input';
import { Wrapper, Form, SubmitButton } from 'features/landing/styles';

ConfirmResetPassword.propTypes = {
  ...formPropTypes,
};

function ConfirmResetPassword({ handleSubmit, submitting }) {
  return (
    <LandingPage>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Field
            label="New Password"
            name="newPassword"
            component={Input}
            type="password"
            placeholder="New Password"
            validate={[requiredValid, minLengthValid]}
          />
          <SubmitButton type="submit" style={{ fontSize: '1.1rem' }}>
            {submitting ? 'Resetting...' : 'Reset'}
          </SubmitButton>
        </Form>
      </Wrapper>
    </LandingPage>
  );
}

export default reduxForm({
  form: 'resetPasswordConfirm',
  onSubmit: ({ newPassword }, dispatch, props) => {
    const { uid, token } = props.match.params;
    const data = {
      uid,
      token,
      new_password: newPassword,
    };
    dispatch(user.confirmResetPassword.request(data, { form: props }));
  },
})(ConfirmResetPassword);
