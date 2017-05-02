import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MarkedSentence from '../index';

storiesOf('components.MarkedSentence', module)
  .add('single MarkedSentence without character or kana', () => (
    <MarkedSentence sentence="その言葉の漢字は難しい" />
  ))
  .add('single MarkedSentence with character', () => (
    <MarkedSentence sentence="その言葉の漢字は難しい" character="漢字" />
  ))
  .add('single MarkedSentence with kana', () => (
    <MarkedSentence sentence="その言葉のかんじは難しい" kana="かんじ" />
  ));
