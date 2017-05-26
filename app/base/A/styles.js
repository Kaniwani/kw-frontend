import styled from 'styled-components';
import Link from 'react-router/lib/Link';

import { link, linkHover } from 'shared/styles/colors';
import { fastEaseQuad } from 'shared/styles/animation';

const plainStyles = `
  text-decoration: none;
  color: inherit;
`;

const linkStyles = `
  transition: all ${fastEaseQuad};
  color: ${link};
  &:hover {
    color: ${linkHover};
  }
`;

export const Anchor = styled.a`
  ${({ plainLink }) => plainLink ? plainStyles : linkStyles}
  cursor: pointer;
`;

export const ExternalAnchor = styled.a.attrs({
  target: '_blank',
  rel: 'external noopener noreferrer',
})`
  ${({ plainLink }) => plainLink ? plainStyles : linkStyles}
  cursor: pointer;
`;

export const RouterLink = Anchor.withComponent(Link);
