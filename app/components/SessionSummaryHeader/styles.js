import styled from 'styled-components';
import { transparentize } from 'polished';

import H1 from 'base/H1';

import { white, whiteDark } from 'shared/styles/colors';
import { bottomLight } from 'shared/styles/shadows';
import { gutter, centerByPadding } from 'shared/styles/layout';

export const Header = styled.header`
  ${centerByPadding}
  position: relative;
  background-color: ${white};
  box-shadow: ${bottomLight};
  border-bottom: 1px solid ${transparentize(0.5, whiteDark)};
`;

export const Wrapper = styled.nav`
  ${gutter({ type: 'outer', position: 'horizontal' })} /* logo adds enough vertical space already */
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled(H1)`
  margin-left: .5rem;
`;
