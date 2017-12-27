import styled from "styled-components";

import { gutter } from "common/styles/layout";

import H2 from "common/components/H2";
import H3 from "common/components/H3";

// prettier-ignore
export const Section = styled.section`
  ${gutter({ type: "inner", position: "vertical" })}
  ${gutter({ type: "outer", position: "horizontal" })};
`;

// prettier-ignore
export const Heading = H3.extend`
  ${gutter({ type: "outer", position: "horizontal" })}
  text-transform: capitalize;
`;

export const Placeholder = H2.extend`
  font-weight: normal;
`;
