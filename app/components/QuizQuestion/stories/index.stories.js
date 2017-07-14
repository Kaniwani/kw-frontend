import React from 'react';
import { storiesOf } from '@storybook/react';
import QuizQuestion from '../index';

storiesOf('components.QuizQuestion', module)
  .add('QuizQuestion with default props', () => (
    <QuizQuestion />
  ));
