import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SessionSummaryHeader from '../index';

storiesOf('components.SessionSummaryHeader', module)
  .add('SessionSummaryHeader with default props', () => <SessionSummaryHeader />);
