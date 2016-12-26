import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Element from '../index';
import Section from 'components/Section';
import P from 'components/P';
import Img from 'components/Img';
import homeImg from 'shared/assets/img/backgrounds/home.jpg';

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
  .add('with img child and fullRow', () => (
    <Element fullRow>
      <div style={{ maxHeight: '50vh', overflowY: 'hidden' }}>
        <Img src={homeImg} alt="Some nice Maple" />
      </div>
    </Element>
  ))
  .add('in a Section as fullRow with sibling Elements', () => (
    <Section>
      <Element fullRow>
        <div style={{ maxHeight: '50vh', overflowY: 'hidden' }}>
          <Img src={homeImg} alt="Some nice Maple" />
        </div>
      </Element>
      <Element>
        <P>Hello Element 1</P>
      </Element>
      <Element>
        <P>Hello Element 1</P>
      </Element>
      <Element>
        <P>Hello Element 1</P>
      </Element>
    </Section>
  ));
