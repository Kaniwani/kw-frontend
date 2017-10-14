import React from 'react';

import loginBackground from 'shared/assets/img/login.svg';
import MultiLogin from 'components/MultiLogin/Loadable';
import { Wrapper, Title, WelcomeBackgroundImg } from './styles';

function WelcomePage() {
  return (
    <Wrapper fullWidth>
      <Title>KaniWani</Title>
      <MultiLogin />
      <WelcomeBackgroundImg imgSrc={loginBackground} />
    </Wrapper>
  );
}

export default WelcomePage;
