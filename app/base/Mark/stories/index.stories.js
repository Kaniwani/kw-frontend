import React from 'react';
import { storiesOf } from '@storybook/react';

import randomHexColor from 'utils/randomHexColor';
import P from 'base/P';
import Mark from '../index';

storiesOf('base.Mark', module)
  .add('single Mark with default props', () => (
    <P>
      Hello there, here is the <Mark>mark</Mark>!
    </P>
  ))
  .add('multiple Marks with random color and bgColor props', () => (
    <P>
      Ewww,
      <Mark color={randomHexColor()} bgColor={randomHexColor()}>these</Mark>
      <Mark color={randomHexColor()} bgColor={randomHexColor()}>are ugly</Mark>
      <Mark color={randomHexColor()} bgColor={randomHexColor()}>as sin</Mark>.
    </P>
  ));
