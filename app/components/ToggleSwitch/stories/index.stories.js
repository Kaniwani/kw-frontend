import React from 'react';
import { storiesOf } from '@storybook/react';
import ToggleSwitch from '../index';

storiesOf('components.ToggleSwitch', module)
  .add('ToggleSwitch with default props', () => (
    <ToggleSwitch
      id="toggle1"
      name="someToggle1"
      checked
      onChange={() => {}}
    />
  ))
  .add('ToggleSwitch with custom props', () => (
    <ToggleSwitch
      id="toggle2"
      name="someToggle2"
      checked={false}
      onChange={() => {}}
      width="12rem"
      height="4rem"
      toggleOnColor="purple"
      toggleOffColor="tan"
    />
  ));
