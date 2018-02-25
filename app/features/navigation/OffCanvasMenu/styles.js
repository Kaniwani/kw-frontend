import styled, { css } from 'styled-components';

import { white, purple } from 'common/styles/colors';
import { resetList } from 'common/styles/utils';
import { midEaseQuad } from 'common/styles/animation';

import IconButton from 'common/components/IconButton';


/*
  NOTE: expects body to have this applied
  via app/common/styles/global.js
  body {
    transition: transform 0.5s;
    &.offCanvasMenu--isOpen {
      transform: translateX(-50%);
      height: 100vh;
      overflow-y: hidden;
      overflow-x: auto;
    }
  }
*/


export const Wrapper = styled.nav`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  background-image: linear-gradient(160deg, ${purple[4]} 10%, ${purple[3]} 100%);
  color: ${white[2]};
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
  width: 100%;
  height: 100vh;
  margin-top: 4rem;
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
