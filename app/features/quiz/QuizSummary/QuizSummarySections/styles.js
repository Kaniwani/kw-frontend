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
export const Heading = styled(H3)`
  ${gutter({ type: "outer", position: "horizontal" })}
  text-transform: capitalize;
`;

export const Placeholder = styled(H2)`
  font-weight: 400;
`;
