import styled from 'styled-components';

import { resetButton } from 'shared/styles/utils';
import { allEaseQuad } from 'shared/styles/animation';

export const Button = styled.button`
  ${resetButton}
  transition: ${allEaseQuad}, transform 100ms linear;
  cursor: pointer;
  opacity: .7;

  &:focus,
  &:hover {
    opacity: .9;
    outline: none;
  }

  &:active {
    opacity: 1;
    transform: scale(.9);
  }
`;
