import { compose, withState, withHandlers } from 'recompose';

const withToggle = compose(
  withState('isToggled', 'updateToggle', false),
  withHandlers({
    toggleOn: ({ updateToggle }) => (/* event */) => updateToggle(true),
    toggleOff: ({ updateToggle }) => (/* event */) => updateToggle(false),
    toggle: ({ updateToggle }) => (/* event */) => updateToggle(currentValue => !currentValue),
  })
);

export default withToggle;
