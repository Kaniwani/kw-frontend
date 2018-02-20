import styled, { css } from 'styled-components';
import { transparentize, darken } from 'polished';

import { white } from 'common/styles/colors';
import { gutter } from 'common/styles/layout';
import { beta } from 'common/styles/typography';

export const Background = styled.div`
  display: flex;
  position: relative;
  padding: .8rem;
  flex: 1 1 auto;
`;

export const Text = styled.h1`
  ${beta}
  margin: 0;
  line-height: 1;
  align-self: center;
  color: ${white[2]};
  z-index: 2;
`;

export const Wrapper = styled.div`
  ${gutter()};
  flex: 1 1 auto;

  ${({ color }) => css`
    & ${Background} {
      background-color: ${transparentize(0.75, color)};
    }

    & ${Text} {
      text-shadow: 1px 1px 0.1em ${transparentize(0.5, darken(0.4, color))};
    }
  `}

`;


export const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1;
`;
