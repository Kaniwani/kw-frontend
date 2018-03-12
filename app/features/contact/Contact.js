import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from 'react-redux';
import { reduxForm, Field, propTypes as formPropTypes } from "redux-form";

import { contact } from "./actions";
import { requiredValid, emailValid } from "common/validations";
import { selectUserDomain } from "features/user/selectors";

import TextAreaAutoSize from "common/components/TextAreaAutoSize";
import InputField from "./InputField";

import { Form } from "./styles";

Contact.propTypes = {
  ...formPropTypes,
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export function Contact({ handleSubmit, reset, submitting }) {
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
        component={TextAreaAutoSize}
        name="body"
        label="Message:"
        maxLength={1000}
        rows={10}
        showControls
        showLabel
        onReset={reset}
        onSubmit={handleSubmit}
        submitButtonText={(submitting && "Submitting") || "Send"}
      />
    </Form>
  );
}

const mapStateToProps = (state, { form = "contact" }) => {
  const { username: name, email } = selectUserDomain(state);
  return {
    form,
    initialValues: {
      name,
      email,
    },
  };
};

export default compose(
  connect(mapStateToProps),
  reduxForm({
    onSubmit: (values, dispatch, form) => dispatch(contact.send.request(values, { form })),
  }),
)(Contact);
