import React from 'react';
import { storiesOf } from '@storybook/react';
import ReviewHeader from '../index';

storiesOf('components.ReviewHeader', module)
  .add('ReviewHeader with default props', () => (
    <ReviewHeader />
  ));
