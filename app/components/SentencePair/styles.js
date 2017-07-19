import styled from 'styled-components';
import { gutter } from 'shared/styles/layout';

export const Wrapper = styled.div`
  ${gutter()}
  ${' ' /* display: flex;
  flex-flow: column nowrap;
  & ${MarkedSentence} {
    flex: 1 1 auto;
  } */}
`;
