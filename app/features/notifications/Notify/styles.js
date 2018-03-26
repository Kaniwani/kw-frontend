import styled, { css, keyframes } from 'styled-components';

import { media } from 'common/styles/media';
import { POSITIONS } from '../constants';

const MAX_WIDTH_PX = '300px';
const MAX_HEIGHT_PX = '150px';

const show = keyframes`
  0% {
    opacity: 0.01;
    transform: perspective(${MAX_WIDTH_PX}) translate(0, -30px) rotateX(90deg);
  }
  100% {
    opacity: 1;
    transform: perspective(${MAX_WIDTH_PX}) translate(0, 0) rotateX(0deg);
  }
`;

const hide = keyframes`
  0% {
    opacity: 1;
    transform: scale(1) translate(0, 0);
  }
  100% {
    opacity: 0.01;
    transform: scale(.8) translate(0, 0);
  }
`;

const shrink = keyframes`
  0% {
    opacity: 0.01;
    max-height: ${MAX_HEIGHT_PX};
    transform: scale(.8) translate(0, 0);
  }
  100% {
    opacity: 0.01;
    max-height: 0.01;
    transform: scale(.8) translate(0, 0);
  }
`;

const positionMixin = ({ position }) => ({
  [POSITIONS.TOP_RIGHT]: css`
    top: 0;
    right: 0;
    flex-direction: column;
  `,
  [POSITIONS.BOTTOM_RIGHT]: css`
    right: 0;
    bottom: 0;
    flex-direction: column-reverse;
  `,
  [POSITIONS.BOTTOM_LEFT]: css`
    left: 0;
    bottom: 0;
    flex-direction: column-reverse;
  `,
  [POSITIONS.TOP_LEFT]: css`
    top: 0;
    left: 0;
    flex-direction: column;
  `,
}[position]);


export const Container = styled.div`
  z-index: 9998;
  position: fixed;
  overflow-y: auto;
  max-height: 100vh;
  width: 100%;

  ${media().sm`
    width: 350px;
  `};

  ${positionMixin}

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  min-height: 0;

  ${media().sm`
    padding: .4rem;
  `};

  &.slide-enter-active {
    animation: ${show} .16s cubic-bezier(0, .5, .5, 1.27499);
  }

  &.slide-exit-active {
    animation: ${hide} .24s cubic-bezier(0.33859, -0.42, 1, -0.22), ${shrink} .24s .24s cubic-bezier(0.5, 0, 0, 1);
  }
`;
