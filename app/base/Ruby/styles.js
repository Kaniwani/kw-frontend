import styled from 'styled-components';

import { greyDark } from 'shared/styles/colors';

export const Wrapper = styled.div`
  display: flex;
  margin: 1rem;
`;

export const Block = styled.div`
  display: flex;
  line-height: 1;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: center;
`;

export const Furi = styled.div`
  font-size: .925em;
  letter-spacing: -0.025em;
  padding-bottom: .2em;
  color: ${greyDark};
`;

export const Chars = styled.div`
  font-size: 2.25em;
`;
