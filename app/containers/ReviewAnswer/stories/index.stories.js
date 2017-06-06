import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ReviewAnswer from '../index';

storiesOf('components.ReviewAnswer', module)
  .add('ReviewAnswer with default props', () => (
    <ReviewAnswer
      streak="APPRENTICE"
      checkAnswer={action('CHECK_ANSWER')}
      recordAnswer={action('RECORD_ANSWER')}
      ignoreAnswer={action('IGNORE_ANSWER')}
    />
  ))
  .add('ReviewAnswer marked invalid', () => (
    <ReviewAnswer
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
  .add('ReviewAnswer marked correct', () => (
    <ReviewAnswer
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
  .add('ReviewAnswer marked incorrect', () => (
    <ReviewAnswer
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
