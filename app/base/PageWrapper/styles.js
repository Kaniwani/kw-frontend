import styled from "styled-components";

import { centerByPadding, centerByMargin } from "shared/styles/layout";

const fullWidthStyle = `
  margin: 0;
  padding: 0 0 5rem 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const fullWidthBgStyle = `
  position: relative;
  ${centerByPadding}
`;

/* eslint-disable no-nested-ternary */
export const Wrapper = styled.div`
  ${({ fullWidth, fullWidthBg }) => {
    switch (true) {
      case fullWidth:
        return fullWidthStyle;
      case fullWidthBg:
        return fullWidthBgStyle;
      default:
        return centerByMargin;
    }
  }} padding-bottom: 4vh;
`;
