import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ReviewAnswerContainer from '../index';

storiesOf('containers.ReviewAnswerContainer', module)
  .add('ReviewAnswerContainer with default props', () => (
    <ReviewAnswerContainer
      streak="APPRENTICE"
      checkAnswer={action('CHECK_ANSWER')}
      recordAnswer={action('RECORD_ANSWER')}
      ignoreAnswer={action('IGNORE_ANSWER')}
    />
  ))
  .add('ReviewAnswerContainer marked invalid', () => (
    <ReviewAnswerContainer
      answer={{
        input: '河g',
        marked: true,
        valid: false,
      }}
      streak="APPRENTICE"
      checkAnswer={action('CHECK_ANSWER')}
      recordAnswer={action('RECORD_ANSWER')}
      ignoreAnswer={action('IGNORE_ANSWER')}
    />
  ))
  .add('ReviewAnswerContainer marked correct', () => (
    <ReviewAnswerContainer
      answer={{
        input: 'すげー',
        type: 'kana',
        marked: true,
        disabled: true,
        correct: true,
        valid: true,
      }}
      streak="APPRENTICE"
      checkAnswer={action('CHECK_ANSWER')}
      recordAnswer={action('RECORD_ANSWER')}
      ignoreAnswer={action('IGNORE_ANSWER')}
    />
  ))
  .add('ReviewAnswerContainer marked incorrect', () => (
    <ReviewAnswerContainer
      answer={{
        input: '河豚',
        type: 'kanji',
        marked: true,
        disabled: true,
        focus: false,
        correct: false,
        incorrect: true,
        valid: true,
      }}
      streak="APPRENTICE"
      checkAnswer={action('CHECK_ANSWER')}
      recordAnswer={action('RECORD_ANSWER')}
      ignoreAnswer={action('IGNORE_ANSWER')}
    />
  ));
