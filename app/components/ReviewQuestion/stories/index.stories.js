import React from 'react';
import { storiesOf } from '@storybook/react';
import ReviewQuestion from '../index';

storiesOf('components.ReviewQuestion', module)
  .add('ReviewQuestion with default props', () => (
    <ReviewQuestion />
  ));
