import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import AddSynonymField from './AddSynonymField';
import { required, onlyKanjiOrKana, onlyKana } from 'shared/validations';
import Button from 'components/Button';
import Element from 'components/Element';
import { Form } from './styles';

const FORM_NAME = 'add-synonym-form'; // must be unique per component

const AddSynonymForm = (props) => {
  const { handleSubmit, submitting, ...rest } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="Kanji"
        type="text"
        component={AddSynonymField}
        label="Kanji"
        validate={[required, onlyKanjiOrKana]}
        {...rest}
      />
      <Field
        name="Kana"
        type="text"
        component={AddSynonymField}
        label="Kana"
        validate={[required, onlyKana]}
        {...rest}
      />
      <Element>
        <Button handleRoute={() => {}} type="submit" disabled={submitting}>Submit</Button>
      </Element>
    </Form>
  );
};

AddSynonymForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: FORM_NAME,  // a unique identifier for this form
})(AddSynonymForm);
