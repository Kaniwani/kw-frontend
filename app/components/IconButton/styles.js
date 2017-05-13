import styled from 'styled-components';

import { resetButton } from 'shared/styles/utils';
import { fastEaseQuad } from 'shared/styles/animation';

export const Button = styled.button`
  ${resetButton}
  transition: all ${fastEaseQuad}, transform 100ms linear;
  cursor: pointer;
  opacity: .7;

  &:not(:disabled) {
    &:focus,
    &:hover {
      opacity: .9;
      outline: none;
    }

    &:active {
      opacity: 1;
      transform: scale(.9);
    }
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
