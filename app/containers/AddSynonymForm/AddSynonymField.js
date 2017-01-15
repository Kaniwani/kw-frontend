import React, { PropTypes } from 'react';
import { LabelText, ValidationMessage } from './styles';
import { ANSWER_TYPES } from 'shared/constants';
import JishoSearchLink from 'components/JishoSearchLink';
import JapaneseInput from 'components/ReduxForm/JapaneseInput';
import Element from 'components/Element';

const AddSynonymField = ({
  userAnswer,
  answerType,
  input,
  label,
  type,
  meta: { touched, error },
  ...rest
}) => {
  const isSameAsAnswerType = answerType === label.toLowerCase();
  const japanesePlaceholder = ANSWER_TYPES[answerType];
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
          autoFocus={!isSameAsAnswerType}
          {...rest}
        />
        <JishoSearchLink keyword={userAnswer} visuallyHidden={isSameAsAnswerType} />
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
};

AddSynonymField.propTypes = {
  userAnswer: PropTypes.string.isRequired,
  answerType: PropTypes.oneOf(Object.keys(ANSWER_TYPES)),
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default AddSynonymField;
