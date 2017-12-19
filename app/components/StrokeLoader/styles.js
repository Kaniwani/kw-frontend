import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';

export const Wrapper = styled.div`
  ${gutter()}
`;

export const Text = styled.div`
  ${gutter({ position: 'horizontal', mod: 2 })}
  font-weight: normal;
  font-size: 1.3em;
`;
