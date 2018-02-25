import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field, SubmissionError, propTypes as formPropTypes } from 'redux-form';

import settings from './actions';
import { selectUsername, selectUserLevel, selectApiKey } from 'features/user/selectors';
import { doValuesMatch, numberValid } from 'common/validations';

import H2 from 'common/components/H2';
import H4 from 'common/components/H4';
import Button from 'common/components/Button';

import InputField from './InputField';
import RangeField from './RangeField';

import { Form, Section, SubSection, Block, Controls, ValidationMessage } from './styles';

const ResetProgress = ({ currentLevel, handleSubmit, submitting, submitSucceeded }) => (
  <Form onSubmit={handleSubmit}>
    <Block>
      <Field
        name="resetLevel"
        label="Reset to start of level:"
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
    </Block>
    <Controls>
      <Button type="submit">
        {(submitting && 'Submitting') || (submitSucceeded && 'Reset!') || 'Reset Progress'}
      </Button>
    </Controls>
  </Form>
);

ResetProgress.propTypes = {
  ...formPropTypes,
  currentLevel: PropTypes.number.isRequired,
};

const ResetProgressForm = compose(
  connect((state) => ({
    name: selectUsername(state),
    currentLevel: selectUserLevel(state),
    initialValues: { resetLevel: 1 },
  })),
  reduxForm({
    form: 'resetProgress',
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
)(ResetProgress);

const UpdateApiKey = ({ handleSubmit, submitting, submitSucceeded }) => (
  <Form onSubmit={handleSubmit}>
    <Block>
      <Field name="apiKey" label="Api Key:" component={InputField} />s
    </Block>
    <Controls>
      <Button type="submit">
        {(submitting && 'Updating') || (submitSucceeded && 'Updated!') || 'Update'}
      </Button>
    </Controls>
  </Form>
);

UpdateApiKey.propTypes = formPropTypes;

const UpdateApiKeyForm = compose(
  connect((state) => ({
    initialValues: { apiKey: selectApiKey(state) },
  })),
  reduxForm({
    form: 'updateApiKey',
    enableReinitialize: true,
    onSubmit: (values, dispatch, props) => {
      dispatch(settings.save.request(values, { form: props }));
    },
  })
)(UpdateApiKey);

function AccountForm() {
  return (
    <Section>
      <H2>Account</H2>
      <UpdateApiKeyForm />
      <SubSection>
        <H4>Reset Kaniwani Progress</H4>
        <ResetProgressForm />
      </SubSection>
    </Section>
  );
}

export default AccountForm;
