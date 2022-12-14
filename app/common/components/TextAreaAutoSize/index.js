import React from 'react';
import PropTypes from 'prop-types';
import { propTypes as formPropTypes } from 'redux-form';

import TextAreaControls from 'common/components/TextAreaControls';
import { Block, Label, TextArea } from './styles';

TextAreaAutoSize.propTypes = {
  ...formPropTypes.fieldPropTypes,
  label: PropTypes.string,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  showLabel: PropTypes.bool,
  showControls: PropTypes.oneOf([true, false, 'always']),
  showReset: PropTypes.bool,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
};

TextAreaAutoSize.defaultProps = {
  label: '',
  rows: 10,
  placeholder: '文章',
  minLength: 1,
  maxLength: 1000,
  showLabel: false,
  showControls: true,
  showReset: true,
  onReset: () => {},
  onSubmit: () => {},
  submitButtonText: 'Submit',
};

function TextAreaAutoSize({
  input,
  meta,
  label,
  rows,
  placeholder,
  minLength,
  maxLength,
  showLabel,
  showControls,
  showReset,
  submitButtonText,
  onReset,
  onSubmit,
}) {
  return (
    <Block>
      <Label htmlFor={input.name} isHidden={!showLabel}>
        <span>{label || input.name}</span>
      </Label>
      <TextArea
        id={input.name}
        rows={rows}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        {...input}
      />
      {showControls === 'always' || (showControls && meta.dirty) ? (
        <TextAreaControls
          maxLength={maxLength}
          textLength={input.value.length}
          showReset={showReset}
          onReset={onReset}
          onSubmit={onSubmit}
          submitButtonText={submitButtonText}
        />
      ) : null}
    </Block>
  );
}

export default TextAreaAutoSize;
