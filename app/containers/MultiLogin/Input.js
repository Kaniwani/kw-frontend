import React from 'react';
import PropTypes from 'prop-types';

import { InputWrapper, Label, InputField, ValidationMessage } from './styles';

Input.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  isHidden: PropTypes.bool,
  children: PropTypes.node,
};

Input.defaultProps = {
  isHidden: false,
};

function Input({ label, input, meta, placeholder, isHidden, children, ...props }) {
  return (
    <InputWrapper aria-hidden={isHidden}>
      <Label htmlFor={input.name}>{label}</Label>
      <InputField
        id={input.name}
        placeholder={placeholder}
        disabled={isHidden}
        autoComplete="on"
        autoCapitalize="none"
        autoCorrect="none"
        spellCheck="false"
        {...input}
        {...props}
      />
      {children}
      {!isHidden && meta.error && <ValidationMessage>{meta.error}</ValidationMessage>}
    </InputWrapper>
  );
}

export default Input;
