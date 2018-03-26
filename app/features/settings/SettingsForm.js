import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';
import { reduxForm, Field, propTypes as formPropTypes } from 'redux-form';

import { selectUserSettings } from 'features/user/selectors';
import { orange, blue } from 'common/styles/colors';
import settings from './actions';

import { WK_SRS_RANKS } from 'common/constants';

import H2 from 'common/components/H2';
import H4 from 'common/components/H4';
import A from 'common/components/A';
import Button from 'common/components/Button';

import SelectField from './SelectField';
import ToggleField from './ToggleField';
import RangeField from './RangeField';

import { Form, Section, SubSection, Controls } from './styles';

const milliToSec = (value = 0) => +value * 1000;
const secToMilli = (value = 0) => +value / 1000;
const INFO_LEVELS = ['LOW', 'MID', 'HIGH'];
const infoLevelNameToNum = (val) => INFO_LEVELS.findIndex((x) => x === val);
const infoLevelNumToName = (val) => INFO_LEVELS[val];

SettingsForm.propTypes = {
  ...formPropTypes,
};

export function SettingsForm({ handleSubmit, submitting, submitSucceeded, dirty }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Section>
        <H2>Quiz</H2>
        <Field name="onVacation" label="Vacation mode" component={ToggleField} parse={Boolean} />
        <Field
          name="minimumWkSrsLevelToReview"
          label="Only review words at or above WaniKani: "
          component={SelectField}
          options={Object.values(WK_SRS_RANKS)}
        />
        <Field
          name="autoExpandAnswerOnSuccess"
          label="Auto expand quiz info when correct"
          component={ToggleField}
          parse={Boolean}
        />
        <Field
          name="autoExpandAnswerOnFailure"
          label="Auto expand quiz info when incorrect"
          component={ToggleField}
          parse={Boolean}
        />
        <Field
          name="infoDetailLevelOnSuccess"
          label="Info detail level when correct:"
          component={SelectField}
          options={INFO_LEVELS}
          format={infoLevelNumToName}
          normalize={infoLevelNameToNum}
        />
        <Field
          name="infoDetailLevelOnFailure"
          label="Info detail level when incorrect:"
          component={SelectField}
          options={INFO_LEVELS}
          format={infoLevelNumToName}
          normalize={infoLevelNameToNum}
          note="Incorrect lessons are always high detail."
        />
        <SubSection>
          <H4>Auto Advance</H4>
          <Field
            name="autoAdvanceOnSuccess"
            label="Advance quiz when correct"
            component={ToggleField}
            parse={Boolean}
          />
          <Field
            name="autoAdvanceOnSuccessDelayMilliseconds"
            label="Advance delay:"
            component={RangeField}
            normalize={milliToSec}
            format={secToMilli}
            display={(value) => `${value}s`}
            min={0}
            max={10}
            step={0.5}
            note="If you tap inside the info panel, it will cancel the pending advance for you."
          />
        </SubSection>
      </Section>

      <Section>
        <H2>Vocabulary</H2>
        <Field
          name="followMe"
          label="Follow WaniKani"
          component={ToggleField}
          parse={(value) => !!value}
          note={
            <span>
              Automatically syncs and unlocks items as they are unlocked in WaniKani. Turn this off
              if you wish to stop syncing, and<strong> before </strong>you end your WK subscription.
            </span>
          }
        />
        <Field
          name="useEijiroProLink"
          label="Use Eijiro Pro in reading links"
          note={
            <span>
              This requires a (free) account at{' '}
              <A href="https://eowf.alc.co.jp" external>
                eowf.alc.co.jp
              </A>
            </span>
          }
          component={ToggleField}
          parse={Boolean}
        />
        <SubSection>
          <H4>Kanji Stroke Diagrams</H4>
          <Field
            name="showKanjiSvgStrokeOrder"
            label="Show stroke order numbers"
            component={ToggleField}
            parse={Boolean}
          />
          <Field
            name="showKanjiSvgGrid"
            label="Show grid lines"
            component={ToggleField}
            parse={Boolean}
          />
          <Field
            name="kanjiSvgDrawSpeed"
            label="Animation speed:"
            component={RangeField}
            min={1}
            max={10}
            step={1}
          />
        </SubSection>
      </Section>
      <Controls>
        <Button bgColor={dirty ? orange[5] : blue[5]} type="submit">
          {submitting ? 'Saving' : submitSucceeded && !dirty ? 'Saved' : 'Save'}
        </Button>
      </Controls>
    </Form>
  );
}

const enhance = compose(
  connect((state) => ({ initialValues: selectUserSettings(state) })),
  branch(({ initialValues }) => Object.keys(initialValues).length < 1, renderNothing),
  reduxForm({
    form: 'settings',
    enableReinitialize: true,
    onSubmit: (values, dispatch, props) => dispatch(settings.save.request(values, { form: props })),
  })
);

export default enhance(SettingsForm);
