import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import invariant from 'invariant';

import { Anchor, Link } from './styles';

A.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  external: PropTypes.bool,
  disabled: PropTypes.bool,
  plainLink: PropTypes.bool,
  activeClassName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

A.defaultProps = {
  href: '',
  to: '',
  external: false,
  disabled: false,
  plainLink: false,
};

function A({ href, to, external, plainLink, activeClassName, ...rest }) {
  let content;
  let props = rest;
  if (external) {
    props = Object.assign({}, rest, { target: '_blank', rel: 'external noopener noreferrer' });
  }
  if (href) {
    content = <Anchor href={href} plainLink={plainLink} {...props} />;
  } else if (to) {
    content = <Link to={to} plainLink={plainLink} activeClassName={activeClassName} {...props} />;
  } else {
    invariant(
      isEmpty(to) && isEmpty(href),
      '(app/components/A/index.js) <A/>: Expected either "to" or "href" prop to be supplied to <A/>',
    );
  }

  return content;
}

export default A;
