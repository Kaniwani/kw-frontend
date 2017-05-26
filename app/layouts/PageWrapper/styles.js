import styled from 'styled-components';

import { centerByPadding, centerByMargin } from 'shared/styles/layout';

export const Wrapper = styled.div`
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
