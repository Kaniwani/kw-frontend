import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'recompose';
import app from 'containers/App/actions';

import { required, onlyKanjiOrKana, onlyKana } from 'shared/validations';

import { Heading } from 'components/VocabEntrySynonyms/styles';
import AddSynonymField from './AddSynonymField';
import { Form, SubmitButton } from './styles';

AddSynonym.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  answerValue: PropTypes.string.isRequired,
  answerType: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
};

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
        userAnswer={answerValue}
        answerType={answerType}
      />
      <Field
        name="kanji"
        type="text"
        component={AddSynonymField}
        label="Kanji"
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
    onSubmit: ({ kanji, kana }, dispatch, { id }) => {
      dispatch(app.review.synonym.add.request({ reviewId: id, character: kanji, kana }));
    },
  }),
);

export default enhance(AddSynonym);
