import React from 'react';

import landingBackground from 'common/assets/img/landing.svg';
import MultiLogin from 'features/landing';
import { Wrapper, Title, LandingBackgroundImg } from './styles';

function LandingPage({ children }) {
  return (
    <Wrapper fullWidth>
      <header>
        <Title>KaniWani</Title>
      </header>
      <div>{children || <MultiLogin />}</div>
      <LandingBackgroundImg imgSrc={landingBackground} />
    </Wrapper>
  );
}

export default LandingPage;
