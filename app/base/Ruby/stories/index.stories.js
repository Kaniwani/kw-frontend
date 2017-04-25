import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Ruby from '../index';

storiesOf('base.Ruby', module)
  .add('without furigana', () => (
    <Ruby>漢字</Ruby>
  ))
  .add('with furigana prop', () => (
    <Ruby furi="かんじ">漢字</Ruby>
  ));
