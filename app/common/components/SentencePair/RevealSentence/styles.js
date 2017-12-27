import styled from "styled-components";

import P from "common/components/P";
import Icon from "common/components/Icon";

import { gutter } from "common/styles/layout";
import { borderRadius } from "common/styles/sizing";
import { greyDark, transparent } from "common/styles/colors";
import { fastEaseQuad, midEaseQuad } from "common/styles/animation";

export const Wrapper = styled.div`
  ${gutter()}
`;

export const RevealIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 1;
  transition: opacity ${fastEaseQuad};
  transform: translate(-50%, -50%);
  z-index: 1;
  color: ${greyDark};
  pointer-events: none;
`;

export const Sentence = P.extend`
  position: relative;
  display: inline-flex;
  font-size: 1.1em;
  font-style: italic;
  line-height: 1.2;
  transition: all ${fastEaseQuad};
  border-radius: ${borderRadius};
  /* blur effect */
  color: ${transparent};
  text-shadow: 0 0 0.8em rgba(0, 0, 0, 0.4);
  &:hover,
  &:active,
  &:focus {
    transition: all ${midEaseQuad};
    outline: none;
    color: ${greyDark};
    text-shadow: none;
    & ${RevealIcon} {
      transition: opacity ${midEaseQuad};
      opacity: 0;
    }
  }
`;
