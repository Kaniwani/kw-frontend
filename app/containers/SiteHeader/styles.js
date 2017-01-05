import styled from 'styled-components';
import { white, whiteDark } from 'shared/styles/colors';
import { adjustColor } from 'shared/styles/utils';
import { bottomLight } from 'shared/styles/shadows';

/* eslint-disable import/prefer-default-export */
export const StyledHeader = styled.header`
  position: relative;
  background-color: ${white};
  box-shadow: ${bottomLight};
  border-bottom: 1px solid ${adjustColor(whiteDark, 'alpha(0.5)')};
`;
/* eslint-enable */
