import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

import { link, linkHover } from 'common/styles/colors';
import { fastEaseQuad } from 'common/styles/animation';

const plainStyles = css`
  text-decoration: none;
  color: inherit;
`;

const linkStyles = css`
  transition: all ${fastEaseQuad};
  color: ${link};
  &:hover,
  &:focus {
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

export const RouterLink = styled(({ plainLink, colorHover, bgColor, bgColorHover, isOffCanvas, noReviews, ...rest }) => <NavLink {...rest} />)`
  ${({ plainLink }) => plainLink ? plainStyles : linkStyles}
  cursor: pointer;
`;
