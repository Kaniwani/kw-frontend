import React from 'react';
import { storiesOf } from '@kadira/storybook';

import randomHexColor from 'utils/randomHexColor';
import Container from 'layouts/Container';
import Mark from '../index';

storiesOf('base.Mark', module)
  .add('single Mark with default props', () => (
    <Container>
      Hello there, here is the <Mark>mark</Mark>!
    </Container>
  ))
  .add('multiple Marks with random color and bgColor props', () => (
    <Container>
      Ewww,
      <Mark color={randomHexColor()} bgColor={randomHexColor()}>these</Mark>
      <Mark color={randomHexColor()} bgColor={randomHexColor()}>are ugly</Mark>
      <Mark color={randomHexColor()} bgColor={randomHexColor()}>as sin</Mark>.
    </Container>
  ));
