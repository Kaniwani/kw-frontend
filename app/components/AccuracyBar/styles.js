import styled from 'styled-components';
import { transparentize, darken } from 'polished';

import * as COLORS from 'shared/styles/colors';
import { gutter } from 'shared/styles/layout';
import { beta } from 'shared/styles/typography';

export const Wrapper = styled.div`
  ${gutter()};
  flex: 1 1 auto;
`;

export const Background = styled.div`
  display: flex;
  position: relative;
  padding: .8rem;
  flex: 1 1 auto;
  background-color: ${({ bgColor }) => transparentize(0.75, COLORS[bgColor])};
`;

export const Text = styled.h1`
  ${beta}
  margin: 0;
  line-height: 1;
  align-self: center;
  color: ${COLORS.whiteLight};
  text-shadow: 1px 1px 0.1em ${({ textShadowColor }) => transparentize(0.5, darken(0.4, COLORS[textShadowColor]))};
  z-index: 2;
`;

export const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1;
`;
