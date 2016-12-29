import styled from 'styled-components';
import { white } from 'shared/styles/colors';
import { headerHeight } from './constants';
import { bottomLight } from 'shared/styles/shadows';
import { media } from 'shared/styles/media';
import Wrapper from 'components/Wrapper';

export const StyledHeader = styled.header`
  position: relative;
  background: rgb(${white});
  box-shadow: ${bottomLight};
  ${media('max').sm`
    min-height: ${headerHeight};
  `}
`;

export const StyledWrapper = styled(Wrapper)`
  display: flex;
  height: auto;
  justify-content: space-between;
  align-items: center;
`;
