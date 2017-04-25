
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Element from 'layouts/Element';
import Container from '../index';

storiesOf('layouts.Container', module)
  .add('with Element child', () => (
    <Container>
      <Element>Hello Container</Element>
    </Container>
  ))
  .add('with multiple Elements', () => (
    <Container>
      <Element>Hello Container 1</Element>
      <Element>Hello Container 2</Element>
      <Element>Hello Container 3</Element>
    </Container>
  ))
  .add('with Element child and no Container padding', () => (
    <Container withPadding={false}>
      <Element>Hello Container</Element>
    </Container>
  ))
  .add('with multiple Elements and no Container padding', () => (
    <Container withPadding={false}>
      <Element>Hello Container 1</Element>
      <Element>Hello Container 2</Element>
      <Element>Hello Container 3</Element>
    </Container>
  ));
