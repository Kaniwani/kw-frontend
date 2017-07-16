import React from 'react';
import { storiesOf } from '@storybook/react';
import QuizSummaryContent from '../index';

storiesOf('components.QuizSummaryContent', module)
  .add('QuizSummaryContent with required props', () => (
    <QuizSummaryContent
      category="review"
      linkRoute="/reviews"
    />
  ));
