import styled from 'styled-components';
import { transparentize, darken } from 'polished';

import * as COLORS from 'shared/styles/colors';
import { borderRadius } from 'shared/styles/sizing';
import { elementGutter } from 'shared/styles/layout';
import { beta } from 'shared/styles/typography';


export const Wrapper = styled.div`
  ${elementGutter};
`;

export const Background = styled.div`
  display: flex;
  position: relative;
  padding: 1rem;
  flex: 1 1 auto;
  background-color: ${({ bgColor }) => transparentize(0.75, COLORS[bgColor])};
  border-radius: ${borderRadius};
`;

export const Text = styled.h1`
  ${beta}
  margin: 0;
  line-height: 1;
  align-self: center;
  color: ${COLORS.whiteLight};
  z-index: 2;
  text-shadow: 1px 1px 0.1em ${({ textShadowColor }) => transparentize(0.5, darken(0.4, COLORS[textShadowColor]))};
`;

export const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${({ bgColor }) => COLORS[bgColor]};
  transition: width .8s ease-in-out;
  width: ${({ percent }) => percent}%;
  z-index: 1;
`;
