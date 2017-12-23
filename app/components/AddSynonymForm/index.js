import React from "react";
import PropTypes from "prop-types";
import {
  reduxForm,
  Field,
  propTypes as formPropTypes,
} from "redux-form";

import { toKana } from "wanakana";

// TODO: in parent
// import { onlyKanjiOrKana, onlyKana } from "shared/validations";
// NOTE: should also pass initialValues from quiz answer
// onSubmit: ({ word, reading }, dispatch, { answerType }) => {
//   const errors = {
//     word: onlyKanjiOrKana(word),
//     reading: onlyKana(reading),
//   };
//   if (Object.values(errors).some(Boolean)) {
//     throw new SubmissionError(errors);
//   }
//   return { word, reading, answerType };
// },
// onSubmitSuccess: ({ word, reading, answerType }, dispatch, { id, category, reset }) => {
//   const inQuiz = answerType != null;
//   dispatch(app.review.synonym.add.request({ reviewId: id, character: word, kana: reading }));
//   reset();
//
//   if (inQuiz) {
//     dispatch(quiz.answer.ignore({ category }));
//   }
// },

import AddSynonymField from "./AddSynonymField";
import { Form, SubmitButton } from "./styles";

export const ANSWER_TYPES = {
  WORD: "WORD",
  READING: "READING",
};

AddSynonymForm.propTypes = {
  ...formPropTypes,
  answerValue: PropTypes.string,
  answerType: PropTypes.oneOf(Object.keys(ANSWER_TYPES)),
};

AddSynonymForm.defaultProps = {
  answerValue: "",
  answerType: "",
};

const convertInput = (value) => toKana(value, { IMEMode: true });

function AddSynonymForm({
  handleSubmit, submitting, answerValue, answerType,
}) {
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="word"
        type="text"
        component={AddSynonymField}
        label={ANSWER_TYPES.WORD}
        normalize={convertInput}
        userAnswer={answerValue}
        answerType={answerType}
      />
      <Field
        name="reading"
        type="text"
        component={AddSynonymField}
        label={ANSWER_TYPES.READING}
        normalize={convertInput}
        userAnswer={answerValue}
        answerType={answerType}
      />
      <SubmitButton type="submit" active={submitting} disabled={submitting}>
        Submit
      </SubmitButton>
    </Form>
  );
}

export default reduxForm()(AddSynonymForm);
