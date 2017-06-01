import styled from 'styled-components';
import { transparentize, darken } from 'polished';

import * as COLORS from 'shared/styles/colors';
import { gutter } from 'shared/styles/layout';

export const Section = styled.section`
  ${gutter({ type: 'outer' })}
`;

export const Wrapper = styled.div`
  ${gutter({ type: 'inner' })}
`;

export const Title = styled.h2`
  padding: 1rem;
  margin: 0;
  text-transform: capitalize;
  color: white;
  background-color: ${({ color }) => transparentize(0.05, COLORS[color])};
  text-shadow: 0.05em 0.05em 0.1em ${({ color }) => darken(0.2, COLORS[color])};
`;
