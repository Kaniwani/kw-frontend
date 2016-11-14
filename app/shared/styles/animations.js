import { keyframes } from 'styled-components';

const wobble = keyframes`
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

const shake = keyframes`
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

const fadeOutUp = keyframes`
  0% {
    opacity: 1;
    transform: translate3d(0,0,0) scale(1);
  }

  100% {
    opacity: 0;
    transform: translate3d(0, -125px, 0) scale(1.4);
  }
}`;

const srsRankUp = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 3.5em, 0);
  }

  30% {
    opacity: .1;
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}`;

const srsRankDown = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, -3.5em, 0);
  }

  30% {
    opacity: .1;
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}`;

export {
  wobble,
  shake,
  fadeOutUp,
  srsRankDown,
  srsRankUp,
};
