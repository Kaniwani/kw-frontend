import React from 'react';
import PropTypes from 'prop-types';

import Button from 'common/components/Button';

import { orange } from 'common/styles/colors';
import { Controls, Count } from './styles';

TextAreaControls.propTypes = {
  maxLength: PropTypes.number,
  textLength: PropTypes.number,
  showReset: PropTypes.bool,
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string,
};

TextAreaControls.defaultProps = {
  maxLength: 1000,
  textLength: 0,
  submitButtonText: 'Submit',
  showReset: true,
};

function TextAreaControls({
  maxLength,
  textLength,
  onReset,
  showReset,
  submitButtonText,
  ...props
}) {
  const remaining = maxLength - textLength;
  return (
    <Controls {...props}>
      {showReset && (
        <Button type="reset" onClick={onReset} bgColor={orange[5]} colorHover={orange[5]}>
          Reset
        </Button>
      )}
      <Button type="submit">{submitButtonText}</Button>
      <Count maxLength={maxLength} remaining={remaining}>
        {remaining}
      </Count>
    </Controls>
  );
}

export default TextAreaControls;
