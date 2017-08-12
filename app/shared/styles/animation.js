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
    transform: rotate(-360deg);
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

  10% {
    transform: translate3d(-4%, 0, 0);
  }

  25% {
    transform: translate3d(4%, 0, 0);
  }

  40% {
    transform: translate3d(-6%, 0, 0);
  }

  55% {
    transform: translate3d(6%, 0, 0);
  }

  70% {
    transform: translate3d(-3%, 0, 0);
  }

  85% {
    transform: translate3d(3%, 0, 0);
  }

}`;

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
    transform: translateY(3.75rem);
  }

  30% {
    opacity: .1;
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}`;

export const srsRankDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-3.75rem);
  }

  30% {
    opacity: .1;
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}`;
