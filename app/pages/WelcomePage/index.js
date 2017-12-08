import React from 'react';

import loginBackground from 'shared/assets/img/login.svg';
import MultiLogin from 'containers/MultiLogin/Loadable';
import { Wrapper, Title, WelcomeBackgroundImg } from './styles';

function WelcomePage() {
  return (
    <Wrapper fullWidth>
      <header>
        <Title>KaniWani</Title>
      </header>
      <main>
        <MultiLogin />
      </main>
      <WelcomeBackgroundImg imgSrc={loginBackground} />
    </Wrapper>
  );
}

export default WelcomePage;
