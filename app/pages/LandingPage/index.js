import React from 'react';

import landingBackground from 'common/assets/img/landing.svg';
import MultiLogin from 'features/landing';
import { Wrapper, Title, LandingBackgroundImg } from './styles';

function LandingPage() {
  return (
    <Wrapper fullWidth>
      <header>
        <Title>KaniWani</Title>
      </header>
      <main>
        <MultiLogin />
      </main>
      <LandingBackgroundImg imgSrc={landingBackground} />
    </Wrapper>
  );
}

export default LandingPage;
