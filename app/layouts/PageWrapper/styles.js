import React from 'react';
import styled, { css } from 'styled-components';

import { centerByPadding, centerByMargin } from 'shared/styles/layout';

const style = css`
  ${({ fullWidth, fullWidthBg }) => {
    if (fullWidth) {
      return `
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        min-height: 100vh;
      `;
    }
    if (fullWidthBg) {
      return `
        position: relative;
        ${centerByPadding}
      `;
    }
    return centerByMargin;
  }}
`;

export const Wrapper = styled(({
  tag,
  children,
  fullWidth,
  fullWidthBg,
  ...props
}) => React.createElement(tag, props, children))`${style}`;
