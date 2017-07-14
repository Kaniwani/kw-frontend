import React from 'react';
import { storiesOf } from '@storybook/react';
import QuizHeader from '../index';

storiesOf('components.QuizHeader', module)
  .add('QuizHeader with default props', () => (
    <QuizHeader />
  ));
