
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Ruby from '../index';
storiesOf('base.Ruby', module)
  .add('without furi', () => (
    <Ruby>漢字</Ruby>
  ))
  .add('with furi prop', () => (
    <Ruby furi="かんじ">漢字</Ruby>
  ))
  .add('with furi in a sentence', () => (
    <p lang="ja">
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
    </p>
    ));
