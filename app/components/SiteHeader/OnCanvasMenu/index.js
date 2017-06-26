import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import NavLink from '../NavLink';
import { Ul } from './styles';

OnCanvasMenu.propTypes = {
  routes: PropTypes.array.isRequired,
};

function OnCanvasMenu({ routes }) {
  return (
    <Ul>
      {routes.map((route) => (
        <NavLink
          key={cuid()}
          {...route}
        />
      ))}
    </Ul>
  );
}

export default OnCanvasMenu;
