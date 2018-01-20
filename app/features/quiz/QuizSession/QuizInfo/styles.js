import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import { whiteLight, greyLight } from 'common/styles/colors';
import { gutter } from 'common/styles/layout';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  flex: 1 1 100%;
  background-color: ${whiteLight};
  overflow: hidden;
  z-index: 2; /* Stay above absolute Quiz Background Image */
  text-align: center;
  ${({ isMinimized }) => isMinimized ? 'flex: 0 1 0px' : css`
  ${gutter({ prop: 'margin', position: 'horizontal' })}
  ${gutter({ prop: 'margin', position: 'bottom' })}
  ${gutter({ prop: 'padding', type: 'outer' })}
  `};
`;

// TODO: can probably remove these
const dashedBottomBorder = css`
  ${gutter({ prop: 'margin', position: 'bottom', mod: 1.5 })}
  ${gutter({
    prop: 'padding',
    position: 'bottom',
    mod: 2,
  })}
  border-bottom: 2px dashed ${rgba(greyLight, 0.3)};
`;

const dashedTopBorder = css`
  ${gutter({ prop: 'margin', position: 'top', mod: 1.5 })}
  ${gutter({
    prop: 'padding',
    position: 'top',
    mod: 2,
  })}
  border-top: 2px dashed ${rgba(greyLight, 0.3)};
`;
