import React from "react";
import { reduxForm, Field, propTypes as formPropTypes } from "redux-form";

import { requiredValid, emailValid } from "shared/validations";

import TextAreaAutoSize from "components/TextAreaAutoSize";
import InputField from "./InputField";

import { Form } from "./styles";

// NOTE: parent should pass initialvalues with profile name and email!
ContactForm.propTypes = {
  ...formPropTypes,
};

function ContactForm({
  handleSubmit, reset, submitting, submitSucceeded,
}) {
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
        validate={[requiredValid]}
        submitButtonText={(submitting && "Submitting") || (submitSucceeded && "Sent!") || "Send"}
      />
    </Form>
  );
}

export default reduxForm()(ContactForm);
