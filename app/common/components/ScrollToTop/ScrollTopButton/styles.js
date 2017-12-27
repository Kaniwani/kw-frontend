import styled from "styled-components";

import { resetButton } from "common/styles/utils";
import { shadowBox } from "common/styles/shadows";
import { blueLight, pink } from "common/styles/colors";
import { fastEaseQuad } from "common/styles/animation";

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
  bottom: 0.75rem;
  right: 0.75rem;
  border-radius: 100%;
  background-color: ${blueLight};
  opacity: 0.8;
  transform: scale(0);
  transition: all ${fastEaseQuad};
  z-index: 10;
  &:active {
    opacity: 1;
    background-color: ${pink};
  }
  ${visibleMixin}
  ${scrollingMixin};
`;
