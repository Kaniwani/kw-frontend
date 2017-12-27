import styled from 'styled-components';

import H1 from 'common/components/H1';

import { white, whiteLight } from 'common/styles/colors';
import { bottomLight } from 'common/styles/shadows';
import { gutter, centerByPadding } from 'common/styles/layout';

export const Header = styled.header`
  ${centerByPadding}
  position: relative;
  background: linear-gradient(to bottom, ${white}, ${whiteLight});
  box-shadow: ${bottomLight};
`;

export const Wrapper = styled.nav`
  ${gutter({ type: 'outer', position: 'horizontal' })} /* logo adds enough vertical space already */
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
`;

export const Heading = H1.extend`
  margin-left: .5rem;
`;
