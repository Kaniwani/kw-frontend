import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';
import { Button } from './styles';

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
};

IconButton.defaultProps = {
  type: 'button',
  color: 'currentColor',
  size: '1em',
};

function IconButton({ name, title, color, size, type, handleClick, ...props }) {
  return (
    <Button
      type={type}
      title={title}
      onClick={handleClick}
      {...props}
    >
      <Icon
        name={name}
        display="block"
        size={size}
        color={color}
      />
    </Button>
  );
}


export default IconButton;
