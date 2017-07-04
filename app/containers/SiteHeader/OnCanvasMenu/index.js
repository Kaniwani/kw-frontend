import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import NavLink from '../NavLink';
import { Ul } from './styles';

OnCanvasMenu.propTypes = {
  routes: PropTypes.array.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

function OnCanvasMenu({ routes, handleLogout }) {
  return (
    <Ul>
      {routes.map((route) => (
        <NavLink
          key={cuid()}
          handleLogout={handleLogout}
          isOffCanvas={false}
          {...route}
        />
      ))}
    </Ul>
  );
}

export default OnCanvasMenu;
