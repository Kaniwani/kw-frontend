import React from "react";
import PropTypes from "prop-types";

import Button from "base/Button";

import { orange } from "shared/styles/colors";
import { Controls, Count } from "./styles";

TextAreaControls.propTypes = {
  maxLength: PropTypes.number,
  textLength: PropTypes.number,
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string,
};

TextAreaControls.defaultProps = {
  maxLength: 1000,
  textLength: 0,
  submitButtonText: "Submit",
};

function TextAreaControls({
  maxLength,
  textLength,
  onReset,
  submitButtonText,
  ...props
}) {
  const remaining = maxLength - textLength;
  return (
    <Controls {...props}>
      <Button type="reset" onClick={onReset} bgColor={orange} colorHover={orange}>
        Reset
      </Button>
      <Button type="submit">{submitButtonText}</Button>
      <Count maxLength={maxLength} remaining={remaining}>
        {remaining}
      </Count>
    </Controls>
  );
}

export default TextAreaControls;
