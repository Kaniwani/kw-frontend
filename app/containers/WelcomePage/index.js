import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import loginBackground from 'shared/assets/img/login.svg';
import MultiLogin from 'containers/MultiLogin';
import { Wrapper, Title, WelcomeBackgroundImg } from './styles';
import { makeSelectWelcomePage } from './selectors';

export class WelcomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Wrapper fullWidth>
        <Title>KaniWani</Title>
        <MultiLogin />
        <WelcomeBackgroundImg imgSrc={loginBackground} />
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  welcomePage: makeSelectWelcomePage,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
