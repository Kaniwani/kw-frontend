import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import user from 'features/user/actions';

import LandingPage from 'pages/LandingPage/Loadable';
import {
  Wrapper,
  Form,
  InputWrapper,
  Label,
  InputField,
  SubmitButton,
} from 'features/landing/styles';

class ConfirmResetPassword extends React.Component {
  static propTypes = {
    confirmReset: PropTypes.func.isRequired,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.confirmReset(this.inputRef.value);
  };

  // TODO: try formik here?
  render() {
    return (
      <LandingPage>
        <Wrapper>
          <Form onSubmit={this.handleSubmit}>
            <InputWrapper>
              <Label htmlFor="newPassword">New Password</Label>
              <InputField
                id="newPassword"
                type="password"
                placeholder="New Password"
                innerRef={(node) => {
                  this.inputRef = node;
                }}
              />
              <SubmitButton lang="ja" type="submit">
                Submit
              </SubmitButton>
            </InputWrapper>
          </Form>
        </Wrapper>
      </LandingPage>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  confirmReset: (newPassword) => {
    const { uid, token } = props.match.params;
    const data = {
      uid,
      token,
      new_password: newPassword,
    };
    dispatch(user.confirmResetPassword.request(data));
  },
});

export default connect(null, mapDispatchToProps)(ConfirmResetPassword);
