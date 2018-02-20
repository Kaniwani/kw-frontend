import styled, { css } from 'styled-components';

import { white } from 'common/styles/colors';
import { gutter } from 'common/styles/layout';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  flex: 1 1 100%;
  background-color: ${white[2]};
  overflow: hidden;
  z-index: 2; /* Stay above absolute Quiz Background Image */
  text-align: center;
  ${({ isMinimized }) => isMinimized ? 'flex: 0 1 0px' : css`
    ${gutter({ prop: 'margin', position: 'horizontal' })}
    ${gutter({ prop: 'margin', position: 'bottom' })}
    ${gutter({ prop: 'padding', type: 'outer' })}
  `};
`;
