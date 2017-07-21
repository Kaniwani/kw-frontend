import React from 'react';
import PropTypes from 'prop-types';

import Element from 'base/Element';
import JishoSearchLink from 'components/JishoSearchLink';
import JapaneseInput from './JapaneseInput';

import { LabelText, ValidationMessage } from './styles';

const ANSWER_TYPES = {
  kanji: '漢字',
  kana: 'かな',
};

AddSynonymField.propTypes = {
  userAnswer: PropTypes.string.isRequired,
  answerType: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

function AddSynonymField({
  userAnswer,
  answerType,
  input,
  label,
  type,
  meta: { touched, error },
  ...rest
}) {
  const labelType = label.toLowerCase();
  const isSameAsAnswerType = answerType === labelType;
  const japanesePlaceholder = ANSWER_TYPES[labelType];

  return (
    <div>
      <Element tag="label" flexRow flexCenter>
        <LabelText>{label}</LabelText>
        <JapaneseInput
          id={`addSynonynm-${label}`}
          type={type}
          label={label}
          input={input}
          placeholder={japanesePlaceholder}
          autoFocus={answerType !== '' && !isSameAsAnswerType}
          {...rest}
        />
        <JishoSearchLink keyword={userAnswer} visuallyHidden={isSameAsAnswerType || answerType === ''} />
      </Element>
      {touched && error && (
        <Element textAlign="center">
          <ValidationMessage>
            {error}
          </ValidationMessage>
        </Element>
      )}
    </div>
  );
}

export default AddSynonymField;
