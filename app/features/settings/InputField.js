import React from 'react';
import PropTypes from 'prop-types';

import { Block, Label, Note, ValidationMessage } from './styles';

const InputField = ({ input, meta, label, icon, placeholder, note, inputStyle, disabled }) => (
  <Block style={{ flex: '1 1 auto' }}>
    <Label htmlFor={input.name}>
      <span>{label || input.name}</span>
      <input
        id={input.name}
        type="text"
        placeholder={placeholder}
        {...input}
        style={inputStyle}
        disabled={disabled}
      />
      {icon && icon}
    </Label>
    {meta.touched && meta.error && <ValidationMessage>{meta.error}</ValidationMessage>}
    {note && <Note constrain>{note}</Note>}
  </Block>
);
InputField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  note: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  icon: PropTypes.object,
  inputStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  note: '',
  placeholder: '',
  inputStyle: {},
  disabled: false,
  icon: undefined,
};

export default InputField;
