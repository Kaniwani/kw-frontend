import React, { PropTypes } from 'react';
import { Label, LabelText, ValidationMessage } from './styles';
import { ANSWER_TYPES } from 'containers/AnswerInput/constants';
import JishoSearchLink from 'components/JishoSearchLink';
import JapaneseInput from 'components/ReduxForm/JapaneseInput';
import P from 'components/P';

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
    <Label>
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
      {touched && error && (
        <ValidationMessage>
          <P style={{ color: 'crimson' }}>{error}</P>
        </ValidationMessage>
      )}
    </Label>
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
