import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, branch, renderNothing } from "recompose";
import { reduxForm, Field } from "redux-form";

import { selectUserSettings } from "features/user/selectors";
import { orange, blue } from 'common/styles/colors';
import settings from "./actions";

import { WK_SRS_RANKS } from "common/constants";

import H2 from "common/components/H2";
import H4 from "common/components/H4";
import A from "common/components/A";
import Button from "common/components/Button";

import SelectField from "./SelectField";
import ToggleField from "./ToggleField";
import RangeField from "./RangeField";

import { Form, Section, SubSection, Controls } from "./styles";

const milliToSec = (value = 0) => +value * 1000;
const secToMilli = (value = 0) => +value / 1000;

SettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  anyTouched: PropTypes.bool.isRequired,
};

export function SettingsForm({ handleSubmit, anyTouched }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Section>
        <H2>Quiz</H2>
        <Field
          name="minimumWkSrsLevelToReview"
          label="Only review items at or above WaniKani: "
          component={SelectField}
          options={Object.values(WK_SRS_RANKS)}
        />
        <Field
          name="onVacation"
          label="Vacation mode"
          component={ToggleField}
          parse={(value) => !!value}
        />
        <Field
          name="autoExpandAnswerOnSuccess"
          label="Auto expand quiz info when correct"
          component={ToggleField}
          parse={(value) => !!value}
        />
        <Field
          name="autoExpandAnswerOnFailure"
          label="Auto expand quiz info when incorrect"
          component={ToggleField}
          parse={(value) => !!value}
        />
        <SubSection>
          <H4>Auto Advance</H4>
          <Field
            name="autoAdvanceOnSuccess"
            label="Auto advance quiz when correct"
            component={ToggleField}
            parse={(value) => !!value}
          />
          <Field
            name="autoAdvanceOnSuccessDelayMilliseconds"
            label="Auto advance speed"
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

      <Section>
        <H2>Vocabulary</H2>
        <Field
          name="followMe"
          label="Unlock new levels as you unlock vocabulary on WaniKani"
          component={ToggleField}
          parse={(value) => !!value}
        />
        <Field
          name="useEijiroProLink"
          label="Use Eijiro Pro in reading links"
          note={
            <span>
              This requires a (free) account at{" "}
              <A href="https://eowf.alc.co.jp" external>
                eowf.alc.co.jp
              </A>
            </span>
          }
          component={ToggleField}
          parse={(value) => !!value}
        />
        <SubSection>
          <H4>Kanji Stroke Diagrams</H4>
          <Field
            name="showKanjiSvgStrokeOrder"
            label="Show stroke order numbers"
            component={ToggleField}
            parse={(value) => !!value}
          />
          <Field
            name="showKanjiSvgGrid"
            label="Show grid lines"
            component={ToggleField}
            parse={(value) => !!value}
          />
          <Field
            name="kanjiSvgDrawSpeed"
            label="Animation speed"
            component={RangeField}
            min={1}
            max={10}
            step={1}
          />
        </SubSection>
      </Section>
      <Controls>
        <Button bgColor={anyTouched ? orange : blue} type="submit">Save</Button>
      </Controls>
    </Form>
  );
}

const enhance = compose(
  connect((state) => ({ initialValues: selectUserSettings(state) })),
  branch(({ initialValues }) => Object.keys(initialValues).length < 1, renderNothing),
  reduxForm({
    form: "settings",
    enableReinitialize: true,
    onSubmit: (values, dispatch) => dispatch(settings.save.request(values)),
  })
);

export default enhance(SettingsForm);
