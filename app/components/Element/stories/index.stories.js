import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Element from '../index';
import P from 'components/P';

storiesOf('Element', module)
  .add('with paragraph child', () => (
    <Element><P>Hello Element</P></Element>
  ))
  .add('with multiple children', () => (
    <Element>
      <P>Hello Element 1</P>
      <P>Hello Element 2</P>
      <P>Hello Element 3</P>
    </Element>
  ))
  .add('with paragraph child and fullRow', () => (
    <Element fullRow><P>Hello Element</P></Element>
  ))
  .add('with multiple children and fullRow', () => (
    <Element fullRow>
      <P>Hello Element 1</P>
      <P>Hello Element 2</P>
      <P>Hello Element 3</P>
    </Element>
  ));
