import React from 'react';
import { storiesOf } from '@storybook/react';
import MarkedSentence from '../index';

storiesOf('components.MarkedSentence', module)
  .add('single MarkedSentence with no matches', () => (
    <MarkedSentence sentence="その言葉の漢字は難しい" character="河豚" kana={['ふぐ']} />
  ))
  .add('single MarkedSentence with character match', () => (
    <MarkedSentence sentence="その言葉の漢字は難しい" character="漢字" kana={['かんじ']} />
  ))
  .add('single MarkedSentence with kana match', () => (
    <MarkedSentence sentence="その言葉のかんじは難しい" character="漢字" kana={['かんじ']} />
  ));
