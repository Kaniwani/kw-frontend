import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ProgressBar from '../index';

storiesOf('components.ProgressBar', module)
  .add('ProgressBar with default props', () => (
    <ProgressBar />
  ));
