import { keyframes } from 'styled-components';
import { timingFunctions } from 'polished';

export const fastEaseQuad = `250ms ${timingFunctions('easeInOutQuad')}`;
export const midEaseQuad = `375ms ${timingFunctions('easeInOutQuad')}`;
export const slowEaseQuad = `500ms ${timingFunctions('easeInOutQuad')}`;

export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-180deg);
  }
`;

export const wobble = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-8deg);
  }
  75% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

export const shake = keyframes`
  from, to {
    transform: translate3d(0, 0, 0);
  }

  10%, 40%, 70% {
    transform: translate3d(-8px, 0, 0);
  }

  25%, 55%, 85% {
    transform: translate3d(8px, 0, 0);
  }
}`;

// .shake {
//   animation: shake .6s;
//   animation-fill-mode: both;
// }

export const fadeOutUp = keyframes`
  0% {
    opacity: 1;
    transform: translate3d(0,0,0) scale(1);
  }

  100% {
    opacity: 0;
    transform: translate3d(0, -125px, 0) scale(1.4);
  }
}`;

export const srsRankUp = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 3.5rem, 0);
  }

  30% {
    opacity: .1;
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}`;

export const srsRankDown = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, -3.5rem, 0);
  }

  30% {
    opacity: .1;
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}`;
