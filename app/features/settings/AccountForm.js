import React from "react";
import PropTypes from "prop-types";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";

import settings from './actions';
import { selectUserName, selectUserLevel } from "features/user/selectors";
import { doValuesMatch, numberValid } from "common/validations";

import H2 from "common/components/H2";
import H4 from "common/components/H4";
import Button from "common/components/Button";

import InputField from "./InputField";
import RangeField from "./RangeField";

import { Form, Section, SubSection, Controls } from "./styles";

AccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  currentLevel: PropTypes.number.isRequired,
};

function AccountForm({ currentLevel, handleSubmit, submitting, submitSucceeded }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Section>
        <H2>Account</H2>
        <SubSection>
          <H4>Reset Kaniwani Progress</H4>
          <Field
            name="resetLevel"
            label="Continue from level:"
            component={RangeField}
            min={1}
            max={currentLevel}
            step={1}
          />
          <Field
            name="confirmation"
            label="Enter username to confirm:"
            placeholder="名前"
            component={InputField}
          />
        </SubSection>
        <Controls>
          <Button type="submit">
            {(submitting && "Submitting") ||
              (submitSucceeded && "Reset!") ||
              "Reset Progress"}
          </Button>
        </Controls>
        {/* TODO: put in their own forms */}
        {/* TODO: actions => api etc */}
        {/* <SubSection>
          <H4>Change Username</H4>
          <Field
            name="changeUsername"
            label="New username:"
            component={InputField}
          />
          <Field
            name="usernameConfirmation"
            label="Confirm username:"
            component={InputField}
          />
        </SubSection>
        <Controls>
          <Button type="submit">
            {(submitting && "Submitting") ||
              (submitSucceeded && "Changed!") ||
              "Save"}
          </Button>
        </Controls>
        <SubSection>
          <H4>Change Password</H4>
          <Field
            name="changeUsername"
            label="New password:"
            component={InputField}
            type="password"
          />
          <Field
            name="usernameConfirmation"
            label="Confirm password:"
            component={InputField}
            type="password"
          />
        </SubSection>
        <Controls>
          <Button type="submit">
            {(submitting && "Submitting") ||
              (submitSucceeded && "Changed!") ||
              "Save"}
          </Button>
        </Controls>
        */}
      </Section>
    </Form>
  );
}

const mapStateToProps = (state) => ({
  name: selectUserName(state),
  currentLevel: selectUserLevel(state),
  initialValues: { resetLevel: 1 },
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: "account",
    onSubmit: ({ confirmation, resetLevel }, dispatch, { name }) => {
      const errors = {
        confirmation: doValuesMatch(confirmation, name),
        resetLevel: numberValid(resetLevel),
      };
      if (Object.values(errors).some(Boolean)) {
        throw new SubmissionError(errors);
      } else {
        dispatch(settings.resetProgress.request({ level: resetLevel }));
      }
    },
  })
);

export default enhance(AccountForm);
