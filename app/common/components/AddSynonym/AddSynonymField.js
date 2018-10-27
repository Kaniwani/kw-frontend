import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { titleCase } from 'voca';
import { Flex } from 'rebass';

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
    <Fragment>
      <Element tag="label" flexColumn>
        <LabelText>{labelText}</LabelText>
        <Flex>
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
        </Flex>
      </Element>
      {error && (
        <Element textAlign="center">
          <ValidationMessage>{error}</ValidationMessage>
        </Element>
      )}
    </Fragment>
  );
}

export default AddSynonymField;
