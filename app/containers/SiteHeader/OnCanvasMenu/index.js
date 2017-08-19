import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import NavLink from '../NavLink';
import { Ul } from '../styles';

OnCanvasMenu.propTypes = {
  links: PropTypes.array.isRequired,
  handleLogout: PropTypes.func,
};

OnCanvasMenu.defaultProps = {
  handleLogout: () => {},
};

function OnCanvasMenu({ links, handleLogout }) {
  return (
    <Ul>
      {links.map((link) => (
        <NavLink
          key={cuid()}
          handleLogout={handleLogout}
          isOffCanvas={false}
          {...link}
        />
      ))}
    </Ul>
  );
}

export default OnCanvasMenu;
