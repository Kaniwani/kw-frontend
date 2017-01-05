import styled from 'styled-components';
import { white, whiteDark } from 'shared/styles/colors';
import { adjustColor } from 'shared/styles/utils';
import { bottomLight } from 'shared/styles/shadows';
import { padding } from 'shared/styles/sizing';
import Container from 'components/Container';
import Element from 'components/Element';

export const StyledHeader = styled.header`
  position: relative;
  background-color: ${white};
  box-shadow: ${bottomLight};
  border-bottom: 1px solid ${adjustColor(whiteDark, 'alpha(0.5)')};
`;

export const StyledContainer = styled(Container)`
  /* header already has a lot of space, let's have less padding than most other containers */
  padding-top: ${padding.mobile.inner.y}rem;
  padding-bottom: ${padding.mobile.inner.y}rem;
`;

export const StyledElement = styled(Element)`
  /* logo has enough vertical spacing already */
  padding-top: 0;
  padding-bottom: 0;
`;
