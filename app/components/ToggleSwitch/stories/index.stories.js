import React from 'react';
import { storiesOf } from '@storybook/react';
import ToggleSwitch from '../index';

storiesOf('components.ToggleSwitch', module)
  .add('ToggleSwitch with default props', () => (
    <ToggleSwitch
      id="toggle1"
      name="someToggle1"
      isToggled
    />
  ))
  .add('ToggleSwitch with custom props', () => (
    <ToggleSwitch
      id="toggle2"
      name="someToggle2"
      isToggled={false}
      width="12rem"
      height="4rem"
      toggleOnColor="purple"
      toggleOffColor="tan"
    />
  ));
