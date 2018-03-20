import styled, { css } from "styled-components";

import { centerByPadding, centerByMargin } from "common/styles/layout";

const fullWidthStyle = css`
  margin: 0;
  padding: 0 0 5rem 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const fullWidthBgStyle = css`
  position: relative;
  ${centerByPadding}
`;

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
  }}
  padding-bottom: 4vh;
`;
