import styled from 'styled-components';

import { gutter } from 'common/styles/layout';
import { resetButton } from 'common/styles/utils';
import { fastEaseQuad } from 'common/styles/animation';

export const Button = styled.button`
  ${resetButton}
  ${gutter()}
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;
  vertical-align: middle;
  transition: all ${fastEaseQuad}, transform 100ms linear;
  cursor: pointer;
  opacity: .7;
  transform: scale(1);

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
