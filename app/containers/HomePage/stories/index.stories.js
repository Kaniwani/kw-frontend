import React from 'react';
import { storiesOf } from '@storybook/react';
import HomePage from '../index';

storiesOf('containers.HomePage', module)
  .add('HomePage with default props', () => (
    <HomePage />
  ));
