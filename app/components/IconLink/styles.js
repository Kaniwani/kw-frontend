import styled from 'styled-components';

import A from 'base/A';
import { ghost } from 'shared/styles/utils';
import { fastEaseQuad } from 'shared/styles/animation';

export const Link = styled(A)`
  transition: all ${fastEaseQuad}, transform 100ms linear;
  cursor: pointer;
  opacity: 1;
  transform: scale(1);
  ${({ visuallyHidden }) => visuallyHidden && ghost}

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
