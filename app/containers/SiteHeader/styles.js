import styled from 'styled-components';
import { white, whiteDark } from 'shared/styles/colors';
import { bottomLight } from 'shared/styles/shadows';

/* eslint-disable import/prefer-default-export */
export const StyledHeader = styled.header`
  position: relative;
  background-color: rgb(${white});
  box-shadow: ${bottomLight};
  border-bottom: 1px solid rgba(${whiteDark}, .5);
`;
/* eslint-enable */
