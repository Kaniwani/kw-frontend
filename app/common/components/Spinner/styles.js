import styled, { css, keyframes } from 'styled-components';

import { gutter } from 'common/styles/layout';

const spinning = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const sharedCircleStyle = css`
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

export const Circle1 = styled.div`
  ${sharedCircleStyle}
`;

export const Circle2 = styled.div`
  ${sharedCircleStyle}
`;

export const Wrapper = styled.div`
  ${({ padded }) => padded && gutter({ type: 'outer' })}
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  flex: 999 0 100%;
`;

export const Circles = styled.div`
  position: relative;
  display: inline-block;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 100%;

  & ${Circle1},
  & ${Circle2} {
    border: ${({ size }) => `calc(${size} / 10)`} solid transparent;
  }

  ${({ duration, color1, color2 }) => css`
    & ${Circle1} {
      border-top-color: ${color1};
      animation: ${spinning} ${duration}ms infinite;
    }
    & ${Circle2} {
      border-bottom-color: ${color2};
      animation: ${spinning} ${duration}ms infinite alternate;
    }
    `}
`;
