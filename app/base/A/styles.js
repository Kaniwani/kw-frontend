import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router';
import { link, linkHover } from 'shared/styles/colors';

const plainStyles = `
  text-decoration: none;
  color: inherit;
`;

const linkStyles = `
  transition: all .3s ease-out;
  color: ${link};
  &:hover {
    color: ${linkHover};
  }
`;

export const styles = css`
  ${(props) => props.plainLink ? plainStyles : linkStyles}
  cursor: pointer;
  &[disabled] {
    pointer-events: none;
    cursor: not-allowed;
    opacity: .6;
  }
`;

/*
 * Styled Components has some issues passing props, this is a painful workaround at the moment
 * to prevent plainLink (used only in styles) from being added to <a> & <Link> as (disallowed) html attrs
 */

export const StyledAnchor = styled(({ plainLink, children, ...rest }) => <a {...rest}>{children}</a>)`${styles}`;
export const StyledLink = styled(({ plainLink, children, ...rest }) => <Link {...rest}>{children}</Link>)`${styles}`;
