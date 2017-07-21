import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'recompose';
import toKana from 'wanakana/toKana';
import { required, onlyKanjiOrKana, onlyKana } from 'shared/validations';

import app from 'containers/App/actions';
import quiz from 'containers/QuizPage/actions';

import { Heading } from 'components/VocabEntrySynonyms/styles';
import AddSynonymField from './AddSynonymField';
import { Form, SubmitButton } from './styles';

AddSynonym.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  answerValue: PropTypes.string.isRequired,
  answerType: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const convertInput = (value) => toKana(value.toLowerCase(), { IMEMode: true });

function AddSynonym({ handleSubmit, submitting, answerValue, answerType }) {
  return (
    <Form onSubmit={handleSubmit} >
      <Heading>Add New Synonym</Heading>
      <Field
        name="kana"
        type="text"
        component={AddSynonymField}
        label="Kana"
        validate={[required, onlyKana]}
        normalize={convertInput}
        userAnswer={answerValue}
        answerType={answerType}
      />
      <Field
        name="kanji"
        type="text"
        component={AddSynonymField}
        label="Kanji"
        normalize={convertInput}
        validate={[required, onlyKanjiOrKana]}
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
    onSubmit: ({ kanji, kana }, dispatch, { id, category }) => {
      dispatch(app.review.synonym.add.request({ reviewId: id, character: kanji, kana }));
      dispatch(quiz.answer.ignore({ category }));
    },
  }),
);

export default enhance(AddSynonym);
