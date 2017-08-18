import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import NavLink from '../NavLink';

import { Wrapper, Ul, CloseButton } from './styles';

OffCanvasMenu.propTypes = {
  links: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

function OffCanvasMenu({ links, isVisible, handleLogout, handleClose }) {
  return (
    <Wrapper isVisible={isVisible}>
      <CloseButton onClick={handleClose} name="CLOSE" title="Close menu" size="3rem" />
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
