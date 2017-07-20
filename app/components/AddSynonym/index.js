import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'recompose';
import isKana from 'wanakana/isKana';

import app from 'containers/App/actions';
import { selectAnswerValue } from 'containers/QuizPage/selectors';

import { required, onlyKanjiOrKana, onlyKana } from 'shared/validations';
import Button from 'base/Button';
import H1 from 'base/H1';

import AddSynonymField from './AddSynonymField';

AddSynonym.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  answerValue: PropTypes.string.isRequired,
  answerType: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
};

function AddSynonym({ handleSubmit, submitting, answerValue, answerType }) {
  return (
    <form onSubmit={handleSubmit} >
      <H1>Add New Synonym</H1>
      <Field
        name="kanji"
        type="text"
        component={AddSynonymField}
        label="Kanji"
        validate={[required, onlyKanjiOrKana]}
        userAnswer={answerValue}
        answerType={answerType}
      />
      <Field
        name="kana"
        type="text"
        component={AddSynonymField}
        label="Kana"
        validate={[required, onlyKana]}
        userAnswer={answerValue}
        answerType={answerType}
      />
      <Button type="submit" active={submitting} disabled={submitting}>Submit</Button>
    </form>
  );
}

const mapStateToProps = (state) => {
  const answerValue = selectAnswerValue(state);
  const answerType = isKana(answerValue) ? 'kana' : 'kanji';
  const kanji = answerType === 'kanji' ? answerValue : '';
  const kana = answerType === 'kana' ? answerValue : '';
  return {
    answerValue,
    answerType,
    initialValues: {
      kanji,
      kana,
    },
  };
};

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'addSynonym',
    onSubmit: ({ kanji, kana }, dispatch, { id }) =>
      dispatch(app.review.synonym.add.request({ reviewId: id, character: kanji, kana })),
  }),
);

export default enhance(AddSynonym);
