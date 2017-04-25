import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Container from 'layouts/Container';
import P from 'base/P';
import Img from 'base/Img';
import homeImg from 'shared/assets/img/home.jpg';
import Element from '../index';
import ColorBlock from '../../../../.storybook/utils/ColorBlock'; // relatively painful

storiesOf('Element', module)
  .add('with paragraph child', () => (
    <Container>
      <Element><P>Hello Element</P></Element>
    </Container>
  ))
  .add('as multiple children', () => (
    <Container>
      <Element>
        <P>Hello Element 1</P>
      </Element>
      <Element>
        <P>Hello Element 2</P>
      </Element>
      <Element>
        <P>Hello Element 3</P>
      </Element>
    </Container>
  ))
  .add('with multiple children and flexRow', () => (
    <Container>
      <Element flexRow>
        <ColorBlock />
        <ColorBlock />
        <ColorBlock />
      </Element>
    </Container>
  ))
  .add('with multiple children and flexCol', () => (
    <Container>
      <Element flexCol>
        <ColorBlock />
        <ColorBlock />
        <ColorBlock />
      </Element>
    </Container>
  ))
  .add('with multiple children and flexRow + flexCenter', () => (
    <Container>
      <Element flexRow flexCenter>
        <ColorBlock />
        <ColorBlock />
        <ColorBlock />
      </Element>
    </Container>
  ))
  .add('with multiple children and flexCol + flexCenter', () => (
    <Container>
      <Element flexCol flexCenter>
        <ColorBlock />
        <ColorBlock />
        <ColorBlock />
      </Element>
    </Container>
  ))
  .add('with padding false and img child ', () => (
    <Container withPadding={false}>
      <Img fullRow src={homeImg} alt="Some nice Maple" />
    </Container>
  ))
  .add('in a Container with img child as fullRow and sibling Elements', () => (
    <Container>
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
    </Container>
  ));
