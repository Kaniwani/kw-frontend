import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import AddSynonymField from './AddSynonymField';
import noop from 'lodash/noop';
import { required, onlyKanjiOrKana, onlyKana } from 'shared/validations';
import Element from 'components/Element';
import Button from 'components/Button';
import { Heading } from 'containers/ReviewInfo/styles';

const FORM_NAME = 'add-synonym-form'; // must be unique per component

const AddSynonymForm = ({ handleSubmit, submitting, userAnswer, answerType }) => (
  <form onSubmit={handleSubmit} >
    <Heading>Add New Synonym</Heading>
    <Field
      name="character"
      type="text"
      component={AddSynonymField}
      label="Kanji"
      validate={[required, onlyKanjiOrKana]}
      userAnswer={userAnswer}
      answerType={answerType}
    />
    <Field
      name="kana"
      type="text"
      component={AddSynonymField}
      label="Kana"
      validate={[required, onlyKana]}
      userAnswer={userAnswer}
      answerType={answerType}
    />
    <Element flexRow flexCenter>
      <Button handleRoute={noop} type="submit" active={submitting} disabled={submitting}>Submit</Button>
    </Element>
  </form>
);

AddSynonymForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  userAnswer: PropTypes.string.isRequired,
  answerType: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: FORM_NAME,  // a unique identifier for this form
})(AddSynonymForm);
