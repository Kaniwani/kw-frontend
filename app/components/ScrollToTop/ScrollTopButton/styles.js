import styled from 'styled-components';

import { resetButton } from 'shared/styles/utils';
import { shadowBox } from 'shared/styles/shadows';
import { blueLight, pink } from 'shared/styles/colors';
import { fastEaseQuad } from 'shared/styles/animation';

const visibleMixin = ({ isVisible }) => isVisible && `
  transition: all ${fastEaseQuad};
  transform: scale(1);

  &:hover {
    opacity: 1;
  }
`;

const scrollingMixin = ({ isScrolling }) => isScrolling && `
  opacity: 1;
  background-color: ${pink};
`;

export const StyledButton = styled.button`
  ${resetButton}
  ${shadowBox}
  position: fixed;
  cursor: pointer;
  bottom: .75rem;
  right: .75rem;
  border-radius: 100%;
  background-color: ${blueLight};
  opacity: .8;
  transform: scale(0);
  transition: all ${fastEaseQuad};
  z-index: 10;
  &:active {
    opacity: 1;
    background-color: ${pink};
  }
  ${visibleMixin}
  ${scrollingMixin}
`;
