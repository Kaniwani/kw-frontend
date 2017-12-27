import React from 'react';
import PropTypes from 'prop-types';
// import { branch, renderComponent } from 'recompose';
import { isEmpty } from 'lodash';
import invariant from 'invariant';

import { Anchor, ExternalAnchor, RouterLink } from './styles';

A.propTypes = {
  href: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  to: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  external: PropTypes.bool,
  plainLink: PropTypes.bool,
};

A.defaultProps = {
  href: false,
  to: false,
  external: false,
};

function A({ href, to, external, ...props }) {
  // minor optimization by only rendering one item, if these are variables instead of functions the unreturned item would still be created/rendered internally - then thrown away
  const renderLink = () => <RouterLink to={to} {...props} />;
  const renderExternalAnchor = () => <ExternalAnchor href={href} {...props} />;
  const renderAnchor = () => <Anchor href={href} {...props} />;

  if (to) {
    return renderLink();
  } else if (href && external) {
    return renderExternalAnchor();
  } else if (href) {
    return renderAnchor();
  }

  invariant(
    isEmpty(to) && isEmpty(href),
    '(app/components/A/index.js) <A/>: Expected either "to" or "href" prop to be supplied to <A/>',
  );
}

export default A;
