import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose } from 'recompose';

import app from 'containers/App/actions';
import { selectProfile } from 'containers/App/selectors';
import { doValuesMatch } from 'shared/validations';

import H2 from 'base/H2';
import H4 from 'base/H4';
import Button from 'base/Button';

import { Form, Section, SubSection, Block, Label, Note, ValidationMessage, Controls } from './styles';

const InputField = ({ input, meta, label, note }) => (
  <Block>
    <Label htmlFor={input.name}>
      <span>{label || input.name}</span>
      <input id={input.name} type="text" placeholder="名前" {...input} />
    </Label>
    {meta.touched && meta.error && <ValidationMessage>{meta.error}</ValidationMessage>}
    {note && <Note>{note}</Note>}
  </Block>
);
InputField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  note: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};

InputField.defaultProps = {
  note: '',
};

AccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
};

function AccountForm({ handleSubmit, submitting, submitSucceeded }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Section>
        <H2>Account</H2>
        <SubSection>
          <H4>Reset Kaniwani Progress</H4>
          <Field name="confirmation" label="Enter your username to confirm:" component={InputField} />
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
  name: createSelector(selectProfile, (profile) => profile.name)(state),
});

const mapDispatchToProps = {
  resetProgress: app.settings.resetProgress.request,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'account',
    onSubmit: ({ confirmation }, dispatch, { name }) => {
      const errors = {
        confirmation: doValuesMatch(confirmation, name),
      };
      if (Object.values(errors).some(Boolean)) {
        throw new SubmissionError(errors);
      } else {
        return dispatch(app.settings.resetProgress.request());
      }
    },
  })
);

export default enhance(AccountForm);
