import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { withWrapper } from '../../../../.storybook/decorators';
import Container from '../index';
import Element from 'components/Element';
import A from 'components/A';
import P from 'components/P';
import background from 'shared/assets/img/home.jpg';
import BackgroundImg from 'components/BackgroundImg';

storiesOf('Container', module)
  .addDecorator(withWrapper)
  .add('with paragraph child', () => (
    <Container tag="header">
      <P>Hello Container</P>
    </Container>
  ))
  .add('with multiple children', () => (
    <Container tag="main">
      <P>Hello Container 1</P>
      <P>Hello <A href="//google.com" external>Container 2</A></P>
      <P>Hello Container 3</P>
    </Container>
  ))
  .add('with BackgroundImg child and fullWidthBg prop', () => (
    <Container fullWidthBg>
      <Element>
        <P style={{ color: 'white' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </P>
      </Element>
      <BackgroundImg img={background} />
    </Container>
  ));
