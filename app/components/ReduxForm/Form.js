import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable'; // <--- immutable import
import validate from './utils/validate';

const FORM_NAME = 'immutable-form'; // must be unique per component

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  const INPUT_ID = `${FORM_NAME}-${label}`;
  return (
    <div>
      <label htmlFor={INPUT_ID}>{label}</label>
      <div>
        <input id={INPUT_ID} {...input} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
};

renderField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

const ImmutableForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text" component={renderField} label="Username" />
      <Field name="email" type="email" component={renderField} label="Email" />
      <Field name="age" type="number" component={renderField} label="Age" />
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  );
};

ImmutableForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: FORM_NAME,  // a unique identifier for this form
  validate,
})(ImmutableForm);
