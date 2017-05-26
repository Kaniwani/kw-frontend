import React from 'react';
import PropTypes from 'prop-types';
// import { branch, renderComponent } from 'recompose';
import isEmpty from 'lodash/isEmpty';
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
  plainLink: false,
};

// const isExternal = ({ external }) => !!external;
// const isRouterLink = ({ to }) => !!to;
//
// const renderAnchor = branch(
//   isExternal,
//   renderComponent(Anchor),
//   renderComponent(ExternalAnchor),
// );
//
// const enhance = branch(
//   isRouterLink,
//   renderComponent(RouterLink),
//   renderAnchor,
// );
//

// perf optimisation - prevents unused component generation
const renderLink = (props) => <RouterLink {...props} />;
const renderAnchor = (props) => <Anchor {...props} />;
const renderExternalAnchor = (props) => <ExternalAnchor {...props} />;

function A({ href, to, external, ...props }) {
  if (to) {
    return renderLink({ to, ...props });
  } else if (href && external) {
    return renderExternalAnchor({ href, ...props });
  } else if (href) {
    return renderAnchor({ href, ...props });
  }
  invariant(
    isEmpty(to) && isEmpty(href),
    '(app/components/A/index.js) <A/>: Expected either "to" or "href" prop to be supplied to <A/>',
  );
}

export default A;
