import React from 'react';
import PropTypes from 'prop-types';

import { InputField } from './styles';

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  type: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};

function Input({ name, type, placeholder, isVisible }) {
  return (
    <InputField
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      isVisible={isVisible}
      disabled={!isVisible}
      autoComplete="on"
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck="false"
    />
  );
}

export default Input;
