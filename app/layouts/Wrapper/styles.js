import React from 'react';
import styled, { css } from 'styled-components';

import { centerByPadding, centerByMargin } from 'shared/styles/layout';

const style = css`
  ${({ fullWidth, fullWidthBg }) => {
    if (fullWidth) {
      return 'width: 100%;';
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

export const StyledWrapper = styled(({
  tag,
  children,
  fullWidth,
  fullWidthBg,
  ...props
}) => React.createElement(tag, props, children))`${style}`;
