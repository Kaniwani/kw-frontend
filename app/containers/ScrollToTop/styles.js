import styled from 'styled-components';
import { resetButton } from 'shared/styles/utils';
import { shadowBox } from 'shared/styles/shadows';
import { blueLight, pink } from 'shared/styles/colors';

export const ScrollButton = styled.button`
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
  transition: all .2s ease-in-out;
  transition: transform .25s ease;
  z-index: 10;

  &.isVisible {
    transition: transform .2s ease-in;
    transform: scale(1);

    &:hover {
      opacity: 1;
    }

    &:active,
    &.isScrolling {
      opacity: 1;
      background-color: ${pink};
    }
  }
`;
