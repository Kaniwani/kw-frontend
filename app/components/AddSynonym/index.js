import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { compose } from 'recompose';
import toKana from 'wanakana/toKana';
import { onlyKanjiOrKana, onlyKana } from 'shared/validations';

import app from 'containers/App/actions';
import quiz from 'containers/QuizPage/actions';

import AddSynonymField from './AddSynonymField';
import { Form, SubmitButton } from './styles';

AddSynonym.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  answerValue: PropTypes.string,
  answerType: PropTypes.string,
};

AddSynonym.defaultProps = {
  answerValue: '',
  answerType: '',
};

const convertInput = (value) => toKana(value, { IMEMode: true });

function AddSynonym({ handleSubmit, submitting, answerValue, answerType }) {
  return (
    <Form onSubmit={handleSubmit} >
      <Field
        name="kanji"
        type="text"
        component={AddSynonymField}
        label="Kanji"
        normalize={convertInput}
        userAnswer={answerValue}
        answerType={answerType}
      />
      <Field
        name="kana"
        type="text"
        component={AddSynonymField}
        label="Kana"
        normalize={convertInput}
        userAnswer={answerValue}
        answerType={answerType}
      />
      <SubmitButton
        type="submit"
        active={submitting}
        disabled={submitting}
      >
        Submit
      </SubmitButton>
    </Form>
  );
}

const enhance = compose(
  reduxForm({
    form: 'addSynonym',
    onSubmit: ({ kanji, kana }, dispatch, { answerType }) => {
      const errors = {
        kanji: onlyKanjiOrKana(kanji),
        kana: onlyKana(kana),
      };
      if (Object.values(errors).some(Boolean)) {
        throw new SubmissionError(errors);
      }
      return { kanji, kana, answerType };
    },
    onSubmitSuccess: ({ kanji, kana, answerType }, dispatch, { id, category, reset }) => {
      const inQuiz = answerType != null;
      dispatch(app.review.synonym.add.request({ reviewId: id, character: kanji, kana }));
      reset();

      if (inQuiz) {
        dispatch(quiz.answer.ignore({ category }));
      }
    },
  }),
);

export default enhance(AddSynonym);
