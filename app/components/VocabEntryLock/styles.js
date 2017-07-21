import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';

export const Wrapper = styled.div`
  ${gutter({ mod: 0.75 })}
  display: flex;
  align-items: center;
`;

export const Text = styled.div`
  ${gutter()}
  display: flex;
  align-items: center;
  font-size: .9em;
`;
