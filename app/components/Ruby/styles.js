import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';

export const Wrapper = styled.div`
  ${gutter()}
  display: inline-flex;
  flex-flow: row wrap;
`;

export const Block = styled.div`
  display: flex;
  line-height: 1;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: center;
  align-self: flex-end;
`;

export const Furi = styled.div`
  font-size: 0.95em;
  letter-spacing: -0.025em;
  padding-bottom: 0.1em;
  opacity: 0.9;
`;

export const Chars = styled.div`
  font-size: 2.3em;
`;
