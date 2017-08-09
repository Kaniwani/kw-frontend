import styled from 'styled-components';

import { gutter, centerByPadding } from 'shared/styles/layout';

export const Footer = styled.footer`
  ${gutter({ position: 'vertical', mod: 10 })}
  ${centerByPadding}
  grid-area: Footer;
  display: flex;
  margin-top: auto;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: black;
  color: white;
`;
