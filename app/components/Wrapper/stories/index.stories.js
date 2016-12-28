import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Wrapper from '../index';
import Element from 'components/Element';

storiesOf('Wrapper', module)
  .add('with Element child', () => (
    <Wrapper>
      <Element>Hello Wrapper</Element>
    </Wrapper>
  ))
  .add('with multiple Elements', () => (
    <Wrapper>
      <Element>Hello Wrapper 1</Element>
      <Element>Hello Wrapper 2</Element>
      <Element>Hello Wrapper 3</Element>
    </Wrapper>
  ))
  .add('with Element child and no Wrapper padding', () => (
    <Wrapper withPadding={false}>
      <Element>Hello Wrapper</Element>
    </Wrapper>
  ))
  .add('with multiple Elements and no Wrapper padding', () => (
    <Wrapper withPadding={false}>
      <Element>Hello Wrapper 1</Element>
      <Element>Hello Wrapper 2</Element>
      <Element>Hello Wrapper 3</Element>
    </Wrapper>
  ));
