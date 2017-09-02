import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose, branch, renderNothing } from 'recompose';

import { requiredValid, emailValid } from 'shared/validations';
import { selectName, selectEmail } from 'containers/App/selectors';

import app from 'containers/App/actions';
import Button from 'base/Button';

import InputField from './InputField';
import TextAreaField from './TextAreaField';

import { Form, Controls } from './styles';

ContactForm.propTypes = {
  rows: PropTypes.number,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
};

ContactForm.defaultProps = {
  rows: 15,
};

function ContactForm({ rows, handleSubmit, submitting, submitSucceeded }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="name"
        label="Your Name:"
        component={InputField}
        validate={[requiredValid]}
      />
      <Field
        name="email"
        label="Preferred Email:"
        component={InputField}
        validate={[requiredValid, emailValid]}
      />
      <Field
        name="body"
        label="Message:"
        component={TextAreaField}
        rows={rows}
        validate={[requiredValid]}
      />
      <Controls>
        <Button type="submit" disabled={submitting}>
          {(submitting && 'Submitting') ||
          (submitSucceeded && 'Sent!') ||
          'Send'}
        </Button>
      </Controls>
    </Form>
  );
}

const mapStateToProps = (state) => ({
  initialValues: {
    name: selectName(state),
    email: selectEmail(state),
    body: '',
  },
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ initialValues: { name } }) => !name, renderNothing),
  reduxForm({
    form: 'contact',
    onSubmit: (values, dispatch) => dispatch(app.contact.request(values)),
  }),
);

export default enhance(ContactForm);
