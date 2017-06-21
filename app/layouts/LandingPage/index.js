import React from 'react';
import styled from 'styled-components';
import { lighten, darken, transparentize } from 'polished';
import H1 from 'base/H1';
import PageWrapper from 'layouts/PageWrapper';
import MultiLogin from 'containers/MultiLogin';
import loginBackground from 'shared/assets/img/login.svg';
import { red } from 'shared/styles/colors';
import { godzilla } from 'shared/styles/typography';

const Wrapper = styled(PageWrapper)`
  background: #e5e5e5; /* same as background-image */
`;

const Title = H1.extend`
  ${godzilla}
  letter-spacing: -0.04em;
  padding-top: .3em;
  padding-bottom: .3em;
  color: ${lighten(0.1, red)};
  text-shadow: 0 .05rem .1rem ${transparentize(0.2, darken(0.3, red))};
  text-align: center;
  z-index: 2;
`;

const BackgroundImage = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100vh;
  min-width: 320px;
  max-width: 1200px;
  margin: 0 auto;
  background-image: url(${loginBackground});
  background-size: 100%;
  background-position: bottom, center;
  background-repeat: no-repeat;
  z-index: 1;
`;

function LandingPage() {
  return (
    <Wrapper fullWidth>
      <Title>KaniWani</Title>
      <MultiLogin />
      <BackgroundImage />
    </Wrapper>
  );
}

export default LandingPage;
