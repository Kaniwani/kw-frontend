import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';
import { reduxForm, Field } from 'redux-form';

import app from 'shared/actions';
import { selectSettings } from 'shared/selectors';

import { WK_SRS_RANKS } from 'shared/constants';

import H2 from 'base/H2';
import H4 from 'base/H4';
import A from 'base/A';
import Button from 'base/Button';

import SelectField from './SelectField';
import ToggleField from './ToggleField';
import RangeField from './RangeField';

import { Form, Section, SubSection, Controls } from './styles';

const milliToSec = (value = 0) => +value * 1000;
const secToMilli = (value = 0) => +value / 1000;

// NOTE: these only work for the integers 1-10, my math-fu is not strong
const toKanjiStrokeStep = (value) => ((10 - +value) + 1) / 100; // 1 => 0.1, 10 => 0.01
const fromKanjiStrokeStep = (value) => Math.round(10 - ((+value * 100) - 1)); // 0.1 => 1, 0.01 => 10

SettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

function SettingsForm({ handleSubmit }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Section name="quiz">
        <H2>Quiz</H2>
        <Field
          name="minimumSrsToReview"
          label="Only review items at or above WaniKani: "
          component={SelectField}
          options={Object.values(WK_SRS_RANKS)}
        />
        <Field
          name="onVacation"
          label="Vacation mode: "
          component={ToggleField}
          parse={(value) => !!value}
        />
        <Field
          name="autoExpandCorrect"
          label="Auto expand quiz info when correct: "
          component={ToggleField}
          parse={(value) => !!value}
        />
        <Field
          name="autoExpandIncorrect"
          label="Auto expand quiz info when incorrect: "
          component={ToggleField}
          parse={(value) => !!value}
        />
        <SubSection name="autoAdvance">
          <H4>Auto Advance</H4>
          <Field
            name="active"
            label="Auto advance quiz when correct: "
            component={ToggleField}
            parse={(value) => !!value}
          />
          <Field
            name="speed"
            label="Auto advance speed: "
            component={RangeField}
            normalize={milliToSec}
            format={secToMilli}
            display={(value) => `${value}s`}
            min={0}
            max={10}
            step={0.5}
          />
        </SubSection>
      </Section>

      <Section name="vocabulary">
        <H2>Vocabulary</H2>
        <Field
          name="followMe"
          label="Unlock new levels as you unlock them on WaniKani: "
          component={ToggleField}
          parse={(value) => !!value}
        />
        <Field
          name="useAlcPro"
          label="Use ALC Pro link in reading links: "
          note={<span>This requires an account at <A href="https://eowf.alc.co.jp" external>eowf.alc.co.jp</A></span>}
          component={ToggleField}
          parse={(value) => !!value}
        />
        <SubSection name="kanjiStroke">
          <H4>Kanji Stroke Diagrams</H4>
          <Field
            name="stroke.order.visible"
            label="Show stroke order numbers: "
            component={ToggleField}
            parse={(value) => !!value}
          />
          <Field
            label="Show grid lines: "
            name="grid.show"
            component={ToggleField}
            parse={(value) => !!value}
          />
          <Field
            name="step"
            label="Animation speed: "
            component={RangeField}
            normalize={toKanjiStrokeStep}
            format={fromKanjiStrokeStep}
            min={1}
            max={10}
            step={1}
          />
        </SubSection>
      </Section>
      <Controls>
        <Button type="submit">Save</Button>
      </Controls>
    </Form>
  );
}

const enhance = compose(
  connect(
    (state) => ({ initialValues: selectSettings(state) }),
    ({ saveSettings: app.settings.save.request }),
  ),
  branch(({ initialValues }) => Object.keys(initialValues).length < 1, renderNothing),
  reduxForm({
    form: 'settings',
    enableReinitialize: true,
    onSubmit: (values, dispatch, { saveSettings }) => saveSettings(values),
  }),
);

export default enhance(SettingsForm);
