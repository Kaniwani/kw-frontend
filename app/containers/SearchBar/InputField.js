import React from 'react';
import PropTypes from 'prop-types';

import { InputWrapper, Label } from './styles';

const InputField = ({ input, label, placeholder }) => (
  <InputWrapper>
    <Label htmlFor={input.name}>
      {label}
    </Label>
    <input id={input.name} type="search" placeholder={placeholder} {...input} />
  </InputWrapper>
);
InputField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

InputField.defaultProps = {
  placeholder: '',
};

export default InputField;
