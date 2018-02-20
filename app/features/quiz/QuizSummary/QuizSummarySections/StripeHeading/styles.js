import styled from "styled-components";
import { transparentize } from "polished";

import { white, grey } from "common/styles/colors";
import { delta } from "common/styles/typography";

export const Heading = styled.h3`
  ${delta} margin: 0 0 1.25em;
  color: ${transparentize(0.1, grey[5])};
  font-weight: 400;
  line-height: 1.15;
  border-bottom: 2px solid ${transparentize(0.75, grey[5])};
`;

export const Text = styled.span`
  display: inline-block;
  position: relative;
  top: 0.5em;
  margin-left: 0.5em;
  padding: 0 0.25em;
  background-color: ${({ bgColor }) => bgColor};
`;

export const Count = styled.strong`
  font-size: 0.9em;
  margin-right: 0.3em;
  padding: 0.1em 0.4em 0.15em;
  color: ${white[5]};
  background-color: ${transparentize(0.1, grey[5])};
  border-radius: 2px;
`;
