import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { action } from '@kadira/storybook-addon-actions';
import ToggleSwitch from '../index';

storiesOf('components.ToggleSwitch', module)
  .add('ToggleSwitch with default props', () => (
    <ToggleSwitch
      id="toggle1"
      name="someToggle1"
      handleChange={action('ToggleSwitch-change')}
      isChecked
    />
  ))
  .add('ToggleSwitch with custom props', () => (
    <ToggleSwitch
      id="toggle2"
      name="someToggle2"
      handleChange={action('ToggleSwitch-change')}
      isChecked={false}
      width="12rem"
      height="4rem"
      toggleOnColor="purple"
      toggleOffColor="tan"
    />
  ));
