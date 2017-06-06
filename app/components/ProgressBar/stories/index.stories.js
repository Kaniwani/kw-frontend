import React from 'react';
import { storiesOf } from '@storybook/react';
import ProgressBar from '../index';

storiesOf('components.ProgressBar', module)
  .add('ProgressBar with default props', () => (
    <ProgressBar />
  ));
