import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';
import { giga } from 'shared/styles/typography';

import H1 from 'base/H1';
import P from 'base/P';

export const Wrapper = styled.div`
  ${gutter()}
  text-transform: capitalize;
`;

export const Primary = H1.extend`
  ${giga}
`;

export const Secondary = styled(P)`
  ${gutter({ type: 'outer', position: 'horizontal' })}
`;
