import React from 'react';
import PropTypes from 'prop-types';

import { InputField } from './styles';

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  isHidden: PropTypes.bool,
  type: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  isHidden: false,
};

function Input({ name, type, placeholder, isHidden, ...props }) {
  return (
    <InputField
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      aria-hidden={isHidden}
      disabled={isHidden}
      autoComplete="on"
      autoCapitalize="none"
      autoCorrect="none"
      spellCheck="false"
      {...props}
    />
  );
}

export default Input;
