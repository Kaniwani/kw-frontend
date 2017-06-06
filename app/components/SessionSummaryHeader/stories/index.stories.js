import React from 'react';
import { storiesOf } from '@storybook/react';
import SessionSummaryHeader from '../index';

storiesOf('components.SessionSummaryHeader', module)
  .add('SessionSummaryHeader with required props', () => (
    <SessionSummaryHeader
      category="review"
      linkRoute="/reviews/"
    />
  ));
