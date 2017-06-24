
import React from 'react';
import { storiesOf } from '@storybook/react';
import Element from 'base/Element';
import Img from 'base/Img';
import homeImg from 'shared/assets/img/home.jpg';
import Container from '../index';

storiesOf('layouts.Container', module)
  .add('with Element child', () => (
    <Container>
      <Element>Hello Container</Element>
    </Container>
  ))
  .add('with multiple Elements', () => (
    <Container>
      <Element>Hello Element 1</Element>
      <Element>Hello Element 2</Element>
      <Element>Hello Element 3</Element>
    </Container>
  ))
  .add('with padding false and Element child', () => (
    <Container withPadding={false}>
      <Element>Hello Element</Element>
    </Container>
  ))
  .add('with padding false and img child ', () => (
    <Container withPadding={false}>
      <Img src={homeImg} alt="Some nice Maple" />
    </Container>
  ))
  .add('with padding false and multiple Elements', () => (
    <Container withPadding={false}>
      <Element>Hello Element 1</Element>
      <Element>Hello Element 2</Element>
      <Element>Hello Element 3</Element>
    </Container>
  ))
  .add('with flexRow and multiple elements', () => (
    <Container flexRow>
      <Element>Hello Element 1</Element>
      <Element>Hello Element 2</Element>
      <Element>Hello Element 3</Element>
    </Container>
  ))
  .add('with flexColumn and multiple elements', () => (
    <Container flexColumn>
      <Element>Hello Element 1</Element>
      <Element>Hello Element 2</Element>
      <Element>Hello Element 3</Element>
    </Container>
  ))
  .add('with flexRow + flexCenter multiple elements', () => (
    <Container flexRow flexCenter>
      <Element>Hello Element 1</Element>
      <Element>Hello Element 2</Element>
      <Element>Hello Element 3</Element>
    </Container>
  ))
  .add('with flexColumn + flexCenter multiple elements', () => (
    <Container flexColumn flexCenter>
      <Element>Hello Element 1</Element>
      <Element>Hello Element 2</Element>
      <Element>Hello Element 3</Element>
    </Container>
  ));
