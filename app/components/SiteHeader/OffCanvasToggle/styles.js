import styled from 'styled-components';

import { resetButton, tapTarget } from 'shared/styles/utils';
import { greyDark } from 'shared/styles/colors';

export const Toggle = styled.button`
  ${resetButton}
  ${tapTarget()}
  position: relative;
  z-index: 1;
  width: 2.5em;
  height: 1.5em;
  cursor: pointer;
  align-self: center;
  padding-bottom: 4px; /* match other items in nav that have bottom padding for hover underlines */
  transition: transform 400ms cubic-bezier(0.55, 0, 0.1, 1);
  transform: rotate(-180deg);

  &:focus {
    outline: none;
  }

  &[aria-expanded=true] {
    transform: rotate(-90deg);
  }
`;

export const ToggleDot = styled.span`
  position: absolute;
  right: 0;
  left: 0;
  display: block;
  width: 4px;
  height: 4px;
  margin: auto;
  pointer-events: none;
  border-radius: 50%;
  background-color: ${greyDark};

  &:nth-of-type(1) {
    top: 0;
  }

  &:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
  }

  &:nth-of-type(3) {
    bottom: 0;
  }
`;
