import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ColorBlock from '../../../../.storybook/ColorBlock';
import Element from '../index';
import Wrapper from 'components/Wrapper';
import P from 'components/P';
import Img from 'components/Img';
import homeImg from 'shared/assets/img/backgrounds/home.jpg';

storiesOf('Element', module)
  .add('with paragraph child', () => (
    <Wrapper>
      <Element><P>Hello Element</P></Element>
    </Wrapper>
  ))
  .add('as multiple children', () => (
    <Wrapper>
      <Element>
        <P>Hello Element 1</P>
      </Element>
      <Element>
        <P>Hello Element 2</P>
      </Element>
      <Element>
        <P>Hello Element 3</P>
      </Element>
    </Wrapper>
  ))
  .add('with multiple children and flexRow', () => (
    <Wrapper>
      <Element flexRow>
        <ColorBlock />
        <ColorBlock />
        <ColorBlock />
      </Element>
    </Wrapper>
  ))
  .add('with multiple children and flexCol', () => (
    <Wrapper>
      <Element flexCol>
        <ColorBlock />
        <ColorBlock />
        <ColorBlock />
      </Element>
    </Wrapper>
  ))
  .add('with multiple children and flexRow + flexCenter', () => (
    <Wrapper>
      <Element flexRow flexCenter>
        <ColorBlock />
        <ColorBlock />
        <ColorBlock />
      </Element>
    </Wrapper>
  ))
  .add('with multiple children and flexCol + flexCenter', () => (
    <Wrapper>
      <Element flexCol flexCenter>
        <ColorBlock />
        <ColorBlock />
        <ColorBlock />
      </Element>
    </Wrapper>
  ))
  .add('with padding false and img child ', () => (
    <Wrapper withPadding={false}>
      <Img src={homeImg} alt="Some nice Maple" />
    </Wrapper>
  ))
  .add('in a Wrapper with img child as fullRow and sibling Elements', () => (
    <Wrapper>
      <Element fullRow>
        <Img src={homeImg} alt="Some nice Maple" />
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
    </Wrapper>
  ));
