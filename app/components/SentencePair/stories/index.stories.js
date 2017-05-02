import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SentencePair from '../index';

storiesOf('components.SentencePair', module)
  .add('single SentencePair with required props', () => (
    <SentencePair
      sentenceEN="Not an actual phrase"
      sentenceJA="実際の言葉じゃない"
      character="言葉"
      kana="ことば"
    />
  ));
