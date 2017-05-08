import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import NavLink from '../NavLink';

import { Wrapper, Ul } from './styles';

OffCanvasMenu.propTypes = {
  id: PropTypes.string.isRequired,
  routes: PropTypes.array.isRequired,
  offsetTop: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

function OffCanvasMenu({ id, routes, offsetTop, isVisible }) {
  return (
    <Wrapper
      id={id}
      offsetTop={offsetTop}
      isVisible={isVisible}
    >
      <Ul>
        {routes.map((route) => (
          <NavLink
            key={cuid()}
            isOffCanvas
            {...route}
          />
        ))}
      </Ul>
    </Wrapper>
  );
}

export default OffCanvasMenu;
