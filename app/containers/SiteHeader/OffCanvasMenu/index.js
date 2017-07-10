import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import NavLink from '../NavLink';

import { Wrapper, Ul } from './styles';

OffCanvasMenu.propTypes = {
  id: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
  offsetTop: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

function OffCanvasMenu({ id, links, offsetTop, isVisible, handleLogout }) {
  return (
    <Wrapper
      id={id}
      offsetTop={offsetTop}
      isVisible={isVisible}
    >
      <Ul>
        {links.map((link) => (
          <NavLink
            key={cuid()}
            handleLogout={handleLogout}
            isOffCanvas
            {...link}
          />
        ))}
      </Ul>
    </Wrapper>
  );
}

export default OffCanvasMenu;
