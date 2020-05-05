import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field, SubmissionError, propTypes as formPropTypes } from 'redux-form';

import {
  selectUsername,
  selectUserLevel,
  selectApiKey,
  selectApiKeyV2,
} from 'features/user/selectors';
import { doValuesMatch, numberValid } from 'common/validations';

import H2 from 'common/components/H2';
import H4 from 'common/components/H4';
import Button from 'common/components/Button';
import settings from './actions';

import InputField from './InputField';
import RangeField from './RangeField';

import { Form, Section, SubSection, Block, Controls } from './styles';

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

const UpdateApiKey = ({ name, label, v2Exists, handleSubmit, submitting, submitSucceeded }) => {
  const isV1 = name === 'apiKey';
  // users that have added a v2 key shouldn't see v1 options anymore
  if (isV1 && v2Exists) {
    return null;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name={name}
        label={label}
        component={InputField}
        props={{ disabled: isV1, inputStyle: { minWidth: '300px', width: '100%' } }}
      />
      {!isV1 && (
        <Controls>
          <Button type="submit">
            {(submitting && 'Updating') || (submitSucceeded && 'Updated!') || 'Update'}
          </Button>
        </Controls>
      )}
    </Form>
  );
};

UpdateApiKey.propTypes = formPropTypes;

const UpdateApiKeyForm = compose(
  connect((state) => ({
    name: 'apiKey',
    label: 'V1 Api Key:',
    v2Exists: selectApiKeyV2(state) != null,
    initialValues: {
      apiKey: selectApiKey(state),
    },
  })),
  reduxForm({
    form: 'updateApiKey',
    enableReinitialize: true,
    onSubmit: (values, dispatch, props) => {
      dispatch(settings.save.request(values, { form: props }));
    },
  })
)(UpdateApiKey);

const UpdateApiKeyV2Form = compose(
  connect((state) => ({
    name: 'apiKeyV2',
    label: 'V2 Api Key:',
    initialValues: {
      apiKeyV2: selectApiKeyV2(state),
    },
  })),
  reduxForm({
    form: 'updateApiKeyV2',
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
      <UpdateApiKeyV2Form />
      <SubSection>
        <H4>Reset Kaniwani Progress</H4>
        <ResetProgressForm />
      </SubSection>
    </Section>
  );
}

export default AccountForm;
