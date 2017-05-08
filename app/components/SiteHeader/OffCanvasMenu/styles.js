import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import { black, white, whiteDark } from 'shared/styles/colors';
import { resetList } from 'shared/styles/utils';

export const Wrapper = styled.div`
  position: absolute;
  width: 180px;
  background: ${white};
  height: auto;
  top: ${(props) => props.offsetTop}px;
  right: -180px;
  z-index: 10;
  transition: right 400ms cubic-bezier(0.55, 0, 0.1, 1);
  border-top: 1px solid ${transparentize(0.5, whiteDark)};
  border-bottom-left-radius: 10px;

  ${({ isVisible }) => isVisible && css`
    right: -1px; /* -1px avoids potential subpixel gap >_< */
    box-shadow: -1px 1px 3px ${transparentize(0.8, black)};
  `}
`;

export const Ul = styled.ul`
  ${resetList}
  display: flex;
  flex-direction: column;
`;
