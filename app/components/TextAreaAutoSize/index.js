import React from "react";
import PropTypes from "prop-types";
import { propTypes as formPropTypes } from "redux-form";

import TextAreaControls from "components/TextAreaControls";
import { Block, Label, TextArea } from "./styles";

TextAreaAutoSize.propTypes = {
  ...formPropTypes.fieldPropTypes,
  label: PropTypes.string,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  showLabel: PropTypes.bool,
  showControls: PropTypes.bool,
  onReset: PropTypes.func,
  submitButtonText: PropTypes.string,
};

TextAreaAutoSize.defaultProps = {
  label: "",
  rows: 10,
  placeholder: "文章",
  required: true,
  minLength: 10,
  maxLength: 1000,
  showLabel: false,
  showControls: true,
  onReset: () => {},
  submitButtonText: 'Submit',
};

function TextAreaAutoSize({
  input, label, showLabel, showControls, maxLength, submitButtonText, onReset, ...props
}) {
  return (
    <Block>
      <Label htmlFor={input.name} isHidden={!showLabel}>
        <span>{label || input.name}</span>
      </Label>
      <TextArea id={input.name} maxLength={maxLength} {...props} {...input} />
      {showControls && props.meta.dirty && (
        <TextAreaControls
          maxLength={maxLength}
          textLength={input.value.length}
          onReset={onReset}
          submitButtonText={submitButtonText}
        />
      )}
    </Block>
  );
}

export default TextAreaAutoSize;
