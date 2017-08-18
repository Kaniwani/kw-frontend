import styled, { css, injectGlobal } from 'styled-components';
import { rgba } from 'polished';

import { whiteLight, purpleLight } from 'shared/styles/colors';
import { resetList } from 'shared/styles/utils';
import { midEaseQuad } from 'shared/styles/animation';

import IconButton from 'components/IconButton';

/* eslint-disable no-unused-expressions */
injectGlobal`
  body {
    transform: translateX(0);
    transition: transform 0.5s;
    &.offCanvasMenu--isOpen {
      transform: translateX(-50%);
    }
  }
`;
/* eslint-enable */

export const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  background: ${rgba(purpleLight, 0.9)};
  color: ${whiteLight};
  z-index: 10;
  visibility: hidden;
  transform: translateX(100%);
  transition: transform ${midEaseQuad}, visibility 0s 0.5s;

  ${({ isVisible }) => isVisible && css`
    visibility: visible;
    transform: translateX(50%);
    transition: transform ${midEaseQuad};
  `}
`;

export const Ul = styled.ul`
  ${resetList}
  margin-top: 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  right: .8rem;
  top: .8rem;
  overflow: hidden;
  z-index: 100;
`;
