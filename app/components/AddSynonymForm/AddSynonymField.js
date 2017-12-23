import React from "react";
import PropTypes from "prop-types";
import { titleCase } from "voca";

import Element from "base/Element";
import JishoSearchLink from "components/JishoSearchLink";
import JapaneseInput from "./JapaneseInput";

import { LabelText, ValidationMessage } from "./styles";

const PLACEHOLDERS = {
  WORD: "漢字",
  READING: "かな",
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
  ...props
}) {
  const labelText = titleCase(label);
  const isSameAsAnswerType = answerType === label;
  const japanesePlaceholder = PLACEHOLDERS[label];

  return (
    <div>
      <Element tag="label" flexRow flexCenter>
        <LabelText>{labelText}</LabelText>
        <JapaneseInput
          id={`addSynonynm-${labelText}`}
          type={type}
          label={labelText}
          input={input}
          placeholder={japanesePlaceholder}
          autoFocus={answerType !== "" && !isSameAsAnswerType}
          {...props}
        />
        <JishoSearchLink
          keyword={userAnswer}
          visuallyHidden={isSameAsAnswerType || answerType === ""}
        />
      </Element>
      {touched &&
        error && (
          <Element textAlign="center">
            <ValidationMessage>{error}</ValidationMessage>
          </Element>
        )}
    </div>
  );
}

export default AddSynonymField;
