import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Element from '../index';

storiesOf('Element', module)
  .add('with paragraph child', () => (
    <Element><p>Hello Element</p></Element>
  ))
  .add('with multiple children', () => (
    <Element>
      <p>Hello Element 1</p>
      <p>Hello Element 2</p>
      <p>Hello Element 3</p>
    </Element>
  ))
  .add('with paragraph child and no padding', () => (
    <Element withPadding={false}><p>Hello Element</p></Element>
  ))
  .add('with multiple children and no padding', () => (
    <Element withPadding={false}>
      <p>Hello Element 1</p>
      <p>Hello Element 2</p>
      <p>Hello Element 3</p>
    </Element>
  ));
