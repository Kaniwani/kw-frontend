import React from 'react';
import { storiesOf } from '@kadira/storybook';
import background from 'shared/assets/img/home.jpg';
import A from 'base/A';
import P from 'base/P';
import BackgroundImg from 'components/BackgroundImg';
import PageWrapper from '../index';

storiesOf('layouts.PageWrapper', module)
  .add('with P child', () => (
    <PageWrapper>
      <P>PageWrapper sets a maximum width and centers via margin auto</P>
    </PageWrapper>
  ))
  .add('with multiple P children', () => (
    <PageWrapper>
      <P>Hello PageWrapper 1</P>
      <P>Hello <A href="//google.com" external>PageWrapper 2</A></P>
      <P>Hello PageWrapper 3</P>
    </PageWrapper>
  ))
  .add('with fullWidth and multiple children', () => (
    <PageWrapper fullWidth>
      <P>fullWidth is always width: 100%</P>
      <P>Hello <A href="//google.com" external>PageWrapper 2</A></P>
      <P>Hello PageWrapper 3</P>
    </PageWrapper>
  ))
  .add('with BackgroundImg child and fullWidthBg prop', () => (
    <PageWrapper fullWidthBg>
      <P style={{ color: 'white' }}>
        fullWidthBg centers via padding so any nested BackgroundImg can take up the full width,
        but other non-absolute elements are constrained
      </P>
      <BackgroundImg imgSrc={background} />
    </PageWrapper>
  ));
