import styled from 'styled-components';

import { gutter, centerByPadding } from 'shared/styles/layout';
import { blackDark, whiteDark } from 'shared/styles/colors';

export const Footer = styled.footer`
  ${gutter({ position: 'top', mod: 4 })}
  ${gutter({ position: 'bottom', mod: 1 })}
  ${centerByPadding}
  position: relative;
  grid-area: Footer;
  margin-top: auto;
  background-color: ${blackDark};
  color: ${whiteDark};
`;
