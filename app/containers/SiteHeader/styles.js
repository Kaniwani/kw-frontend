import styled from 'styled-components';
import { white } from 'shared/styles/colors';
import { bottomLight } from 'shared/styles/shadows';
import Wrapper from 'components/Wrapper';

export const StyledHeader = styled.header`
  position: relative;
  background: rgb(${white});
  box-shadow: ${bottomLight};
`;

export const StyledWrapper = styled(Wrapper)`
  display: flex;
  height: auto;
  justify-content: space-between;
  align-items: center;
`;
