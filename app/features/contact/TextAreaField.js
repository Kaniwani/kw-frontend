import React from "react";
import PropTypes from "prop-types";

import { TextArea } from "old/features/TextAreaAutoSize/styles";
import { Block, Label, Note, ValidationMessage } from './styles';

const InputField = ({
  input, meta, label, rows, note,
}) => (
  <Block>
    <Label htmlFor={input.name}>
      <span>{label || input.name}</span>
    </Label>
    <TextArea id={input.name} rows={rows} maxLength={1000} {...input} />
    {meta.touched && meta.error && <ValidationMessage>{meta.error}</ValidationMessage>}
    {note && <Note>{note}</Note>}
  </Block>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
  note: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

InputField.defaultProps = {
  note: "",
};

export default InputField;
