import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, branch, renderNothing } from 'recompose';

import app from 'shared/actions';
import { selectProfile } from 'shared/selectors';
import { doValuesMatch, numberValid } from 'shared/validations';

import H2 from 'base/H2';
import H4 from 'base/H4';
import Button from 'base/Button';

import InputField from './InputField';
import RangeField from './RangeField';

import { Form, Section, SubSection, Controls } from './styles';

AccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  currentLevel: PropTypes.number.isRequired,
};

function AccountForm({ currentLevel, handleSubmit, submitting, submitSucceeded }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Section name="">
        <H2>Account</H2>
        <SubSection name="">
          <H4>Reset Kaniwani Progress</H4>
          <Field name="resetLevel" label="Continue from level:" component={RangeField} min={1} max={currentLevel} step={1} />
          <Field name="confirmation" label="Enter username to confirm:" placeholder="名前" component={InputField} />
        </SubSection>
        <Controls>
          <Button type="submit">
            {(submitting && 'Submitting') ||
            (submitSucceeded && 'Reset!') ||
            'Reset Progress'}
          </Button>
        </Controls>
      </Section>
    </Form>
  );
}


const mapStateToProps = (state) => ({
  name: createSelector(selectProfile, (profile) => profile && profile.name)(state),
  currentLevel: createSelector(selectProfile, (profile) => profile && profile.currentLevel)(state),
  initialValues: { resetLevel: 1 },
});

const mapDispatchToProps = {
  resetProgress: app.settings.resetProgress.request,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(({ name }) => !name, renderNothing),
  reduxForm({
    form: 'account',
    onSubmit: ({ confirmation, resetLevel }, dispatch, { name }) => {
      const errors = {
        confirmation: doValuesMatch(confirmation, name),
        resetLevel: numberValid(resetLevel),
      };
      if (Object.values(errors).some(Boolean)) {
        throw new SubmissionError(errors);
      } else {
        return dispatch(app.settings.resetProgress.request({ level: resetLevel }));
      }
    },
  })
);

export default enhance(AccountForm);
