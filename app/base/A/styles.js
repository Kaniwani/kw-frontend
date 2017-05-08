import React from 'react';
import styled, { css } from 'styled-components';
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

export const style = css`
  ${({ plainLink }) => plainLink ? plainStyles : linkStyles}
  cursor: pointer;
  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: .6;
  }
`;

/*
 * Styled Components has some issues passing props, this is a painful workaround at the moment
 * to prevent plainLink (used only in style) from being added to <a> & <Link> as (disallowed) html attrs
 */

export const Anchor = styled(({ plainLink, children, ...rest }) => <a {...rest}>{children}</a>)`${style}`;
export const RouterLink = styled(({ plainLink, children, ...rest }) => <Link {...rest}>{children}</Link>)`${style}`;
