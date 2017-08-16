import React from 'react';
import PropTypes from 'prop-types';

import { Block, Label, Note, ValidationMessage } from './styles';


const InputField = ({ input, meta, label, note }) => (
  <Block>
    <Label htmlFor={input.name}>
      <span>{label || input.name}</span>
      <input id={input.name} type="text" placeholder="名前" {...input} />
    </Label>
    {meta.touched && meta.error && <ValidationMessage>{meta.error}</ValidationMessage>}
    {note && <Note>{note}</Note>}
  </Block>
);
InputField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  note: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};

InputField.defaultProps = {
  note: '',
};

export default InputField;
