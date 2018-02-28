import React from 'react';
import PropTypes from 'prop-types';
import { titleCase } from 'voca';

import Aux from 'common/components/Aux';
import Element from 'common/components/Element';
import JishoSearchLink from './JishoSearchLink';

import { Input, LabelText, ValidationMessage } from './styles';

const PLACEHOLDERS = {
  WORD: '漢字',
  READING: 'かな',
};

AddSynonymField.propTypes = {
  userAnswer: PropTypes.string.isRequired,
  answerType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleRef: PropTypes.func.isRequired,
  error: PropTypes.string,
};

AddSynonymField.defaultProps = {
  error: '',
};

function AddSynonymField({ userAnswer, answerType, label, type, error, handleRef }) {
  const labelText = titleCase(label);
  const isSameAsAnswerType = answerType === label;
  const japanesePlaceholder = PLACEHOLDERS[label];

  return (
    <Aux>
      <Element tag="label" flexRow flexCenter>
        <LabelText>{labelText}</LabelText>
        <Input
          id={`addSynonynm-${labelText}`}
          type={type}
          label={labelText}
          placeholder={japanesePlaceholder}
          autoFocus={answerType !== '' && !isSameAsAnswerType}
          innerRef={handleRef}
          lang="ja"
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
        />
        <JishoSearchLink
          keyword={userAnswer}
          visuallyHidden={isSameAsAnswerType || answerType === ''}
        />
      </Element>
      {error && (
        <Element textAlign="center">
          <ValidationMessage>{error}</ValidationMessage>
        </Element>
      )}
    </Aux>
  );
}

export default AddSynonymField;
