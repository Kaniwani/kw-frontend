import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { user } from 'features/user/actions';

import Container from 'common/components/Container';
import PageWrapper from 'common/components/PageWrapper';

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
      <PageWrapper>
        <Container>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="newPassword">
              New Password
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                ref={(node) => {
                  this.inputRef = node;
                }}
              />
            </label>
            <button type="submit">Reset Password</button>
          </form>
        </Container>
      </PageWrapper>
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
