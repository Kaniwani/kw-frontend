import styled from 'styled-components';

import { gutter } from 'common/styles/layout';

export const Wrapper = styled.div`
  ${gutter()}
`;

export const Text = styled.div`
  ${gutter({ position: 'horizontal', mod: 2 })}
  font-weight: 400;
  font-size: 1.3em;
`;
