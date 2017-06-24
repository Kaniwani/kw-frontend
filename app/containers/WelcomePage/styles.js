import styled from 'styled-components';

import { lighten, darken, transparentize } from 'polished';
import { red } from 'shared/styles/colors';
import { godzilla } from 'shared/styles/typography';

import H1 from 'base/H1';
import BackgroundImg from 'components/BackgroundImg';
import PageWrapper from 'base/PageWrapper';

export const Wrapper = styled(PageWrapper)`
  background: #e5e5e5; /* same as background-image */
`;

export const Title = H1.extend`
  ${godzilla}
  letter-spacing: -0.04em;
  padding-top: .3em;
  padding-bottom: .3em;
  color: ${lighten(0.1, red)};
  text-shadow: 0 .05rem .1rem ${transparentize(0.2, darken(0.3, red))};
  text-align: center;
  z-index: 2;
`;

export const WelcomeBackgroundImg = BackgroundImg.extend`
  left: 50%;
  transform: translateX(-50%);
  height: 100vh;
  min-width: 320px;
  max-width: 1200px;
  margin: 0 auto;
  background-size: 100%;
  background-position: bottom center;
  z-index: 1;
`;
