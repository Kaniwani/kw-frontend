import React from 'react';
import { storiesOf } from '@storybook/react';
import AccuracyBar from '../index';

storiesOf('components.AccuracyBar', module)
  .add('AccuracyBar with default props', () => <AccuracyBar />)
  .add('AccuracyBar with percent prop', () => <AccuracyBar percent={66} />)
  .add('AccuracyBars with percent and color props', () => (
    <div>
      <AccuracyBar percent={78} color="green" />
      <AccuracyBar percent={22} color="red" />
      <AccuracyBar percent={12} color="orange" />
    </div>
  ));
