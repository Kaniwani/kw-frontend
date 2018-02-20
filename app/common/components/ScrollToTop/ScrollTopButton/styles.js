import styled, { css } from "styled-components";

import { resetButton } from "common/styles/utils";
import { shadowBox } from "common/styles/shadows";
import { blue, pink } from "common/styles/colors";
import { fastEaseQuad } from "common/styles/animation";

const visibleMixin = ({ isVisible }) => isVisible && css`
  transition: all ${fastEaseQuad};
  transform: scale(1);

  &:hover {
    opacity: 1;
  }
`;

const scrollingMixin = ({ isScrolling }) => isScrolling && css`
  opacity: 1;
  background-color: ${pink[5]};
`;

export const StyledButton = styled.button`
  ${resetButton}
  ${shadowBox}
  position: fixed;
  bottom: 0.75rem;
  right: 0.75rem;
  border-radius: 100%;
  background-color: ${blue[4]};
  opacity: 0.8;
  transform: scale(0);
  transition: all ${fastEaseQuad};
  z-index: 10;
  &:active {
    opacity: 1;
    background-color: ${pink[5]};
  }
  ${visibleMixin}
  ${scrollingMixin};
`;
