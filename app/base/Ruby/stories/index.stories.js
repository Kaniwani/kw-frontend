import React from 'react';
import { storiesOf } from '@kadira/storybook';

import P from 'base/P';
import Ruby from '../index';

storiesOf('base.Ruby', module)
  .add('without furi', () => (
    <P lang="ja">
      <Ruby>漢字</Ruby>
    </P>
  ))
  .add('with furi prop', () => (
    <P lang="ja">
      <Ruby furi="かんじ">漢字</Ruby>
    </P>
  ))
  .add('with furi in a sentence', () => (
    <P lang="ja">
      <Ruby furi="わたし">私</Ruby>
      <Ruby>は</Ruby>
      <Ruby furi="てきい">敵意</Ruby>
      <Ruby>をもったまでも</Ruby>
      <Ruby furi="ひ">冷</Ruby>
      <Ruby>ややかな</Ruby>
      <Ruby furi="たいおう">対応</Ruby>
      <Ruby>を</Ruby>
      <Ruby furi="う">受</Ruby>
      <Ruby>けた</Ruby>
    </P>
    ));
