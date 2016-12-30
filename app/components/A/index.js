import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import isEmpty from 'lodash/isEmpty';
import invariant from 'invariant';
import styled, { css } from 'styled-components';
import { Link } from 'react-router';
import { link, linkHover } from 'shared/styles/colors';

const plainStyles = `
  color: inherit;
  text-decoration: none;
`;

const linkStyles = `
  transition: all .3s ease-out;
  color: rgb(${link});
  &:hover {
    color: rgb(${linkHover});
  }
`;

const styles = css`
  ${(props) => props.plainLink ? plainStyles : linkStyles}
  cursor: pointer;
  &[disabled] {
    pointer-events: none;
    cursor: not-allowed;
    opacity: .6;
  }
`;

// Styled Components has some issues passing props, this is a painful workaround at the moment
// to prevent plainLink (used only in styles) from being added to <a> & <Link> as (disallowed) props

/* eslint-disable jsx-a11y/anchor-has-content, no-unused-vars */
const StyledAnchor = styled(({ plainLink, children, ...rest }) => <a {...rest}>{children}</a>)`${styles}`;
const StyledLink = styled(({ plainLink, children, ...rest }) => <Link {...rest}>{children}</Link>)`${styles}`;
/* eslint-enable */

const A = ({ href, to, external, plainLink, activeClassName, ...rest }) => {
  let content;
  let props = rest;
  if (external) {
    props = Object.assign({}, rest, { target: '_blank', rel: 'external noopener noreferrer' });
  }
  if (href) {
    content = <StyledAnchor href={href} plainLink={plainLink} {...props} />;
  } else if (to) {
    content = <StyledLink to={to} plainLink={plainLink} activeClassName={activeClassName} {...props} />;
  } else {
    invariant(
      isEmpty(to) && isEmpty(href),
      '(app/components/A/index.js) <A/>: Expected either "to" or "href" prop to be supplied to <A/>',
    );
  }

  return content;
};

A.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  external: PropTypes.bool,
  disabled: PropTypes.bool,
  plainLink: PropTypes.bool,
  activeClassName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.Iterable),
    PropTypes.array,
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

A.defaultProps = {
  href: null,
  to: null,
  external: false,
  disabled: false,
  plainLink: false,
};

export default A;
