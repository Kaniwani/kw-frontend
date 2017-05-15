import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';
import { Button } from './styles';

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
};

IconButton.defaultProps = {
  type: 'button',
  color: 'currentColor',
  size: '1.5em',
  disabled: false,
  handleClick: (event) => event, /* passthrough, for submit buttons in forms with onSubmit */
};

function IconButton({ name, title, color, size, type, handleClick, disabled, ...props }) {
  return (
    <Button
      type={type}
      title={title}
      aria-label={title}
      onClick={handleClick}
      disabled={disabled}
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
