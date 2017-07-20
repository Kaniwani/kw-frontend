import styled from 'styled-components';

import { centerByPadding, centerByMargin } from 'shared/styles/layout';

export const Wrapper = styled.div`
  ${({ fullWidth, fullWidthBg }) => `
      ${fullWidth ? `
        margin: 0;
        padding: 0 0 5rem 0;
        width: 100%;
        height: 100%;
        min-height: 100vh;
      ` : fullWidthBg ? `
        position: relative;
        ${centerByPadding}
      ` : `
        ${centerByMargin};
      `
    }`
  }
  
  padding-bottom: 4vh;

`;
