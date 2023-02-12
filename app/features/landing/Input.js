import React from 'react';
import PropTypes from 'prop-types';

import { InputWrapper, Label, InputField, ValidationMessage } from './styles';

Input.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  isHidden: PropTypes.bool,
  children: PropTypes.node,
};

Input.defaultProps = {
  isHidden: false,
};

function Input({ label, input, meta, placeholder, autoComplete, isHidden, children, ...props }) {
  return (
    <InputWrapper aria-hidden={isHidden} isHidden={isHidden}>
      <Label htmlFor={input.name}>{label}</Label>
      <InputField
        id={input.name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        isHidden={isHidden}
        disabled={meta.submitting || isHidden}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck="false"
        {...input}
        {...props}
      />
      {children}
      {!isHidden && meta.touched && meta.error && (
        <ValidationMessage>{meta.error}</ValidationMessage>
      )}
    </InputWrapper>
  );
}

export default Input;
