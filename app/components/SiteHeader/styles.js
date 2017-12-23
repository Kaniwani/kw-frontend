import styled from 'styled-components';

import { centerByPadding, gutter } from 'shared/styles/layout';
import { white, whiteLight } from 'shared/styles/colors';
import { bottomLight } from 'shared/styles/shadows';
import { resetList } from 'shared/styles/utils';

export const Header = styled.div`
  ${centerByPadding}
  ${gutter({ prop: 'margin', position: 'bottom', type: 'outer' })} /* logo unfortunately adds height already */
  grid-area: Header;
  position: relative;
  background: linear-gradient(to bottom, ${white}, ${whiteLight});
  box-shadow: ${bottomLight};
`;

export const Nav = styled.nav`
  ${gutter({ position: 'horizontal', type: 'outer' })} /* logo unfortunately adds height already */
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
`;

export const Ul = styled.ul`
  ${resetList}
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;
