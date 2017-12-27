import React from "react";
import PropTypes from "prop-types";

import { InputWrapper, Label } from "./styles";

const InputField = ({
  input, label, meta, placeholder, ...attrs
}) => (
  <InputWrapper>
    <Label htmlFor={input.name}>{label}</Label>
    <input
      id={input.name}
      type="search"
      placeholder={placeholder}
      {...input}
      {...attrs}
    />
  </InputWrapper>
);
InputField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
};

InputField.defaultProps = {
  placeholder: "",
};

export default InputField;
