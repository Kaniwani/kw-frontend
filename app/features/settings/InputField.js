import React from 'react';
import PropTypes from 'prop-types';

import { Block, Label, Note, ValidationMessage } from './styles';

const InputField = ({ input, meta, label, placeholder, note, inputStyle }) => (
  <Block>
    <Label htmlFor={input.name}>
      <span>{label || input.name}</span>
      <input id={input.name} type="text" placeholder={placeholder} {...input} style={inputStyle} />
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
};

InputField.defaultProps = {
  note: '',
  placeholder: '',
};

export default InputField;
