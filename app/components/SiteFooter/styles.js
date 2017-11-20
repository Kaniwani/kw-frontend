import styled from 'styled-components';
import Container from 'base/Container';
import BackgroundImg from 'components/BackgroundImg';

import { gutter, centerByPadding } from 'shared/styles/layout';
import { black, blackDark, whiteDark } from 'shared/styles/colors';

export const Footer = styled.footer`
  ${gutter({ position: 'top', mod: 4 })}
  ${gutter({ position: 'bottom', mod: 1 })}
  ${centerByPadding}
  position: relative;
  grid-area: Footer;
  margin-top: auto;
  background: linear-gradient(160deg, ${black}, ${blackDark});
  color: ${whiteDark};
`;

export const CrabigatorStencil = BackgroundImg.extend`
  z-index: 1;
  opacity: .5;
  max-height: 95%;
`;

export const Links = styled(Container)`
  z-index: 2;
  margin-right: 50px;
`;
