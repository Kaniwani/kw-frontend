import React from 'react';
import { storiesOf } from '@kadira/storybook';
import background from 'shared/assets/img/home.jpg';
import Element from 'layouts/Element';
import A from 'base/A';
import P from 'base/P';
import BackgroundImg from 'components/BackgroundImg';
import Wrapper from '../index';

storiesOf('layouts.Wrapper', module)
  .add('with paragraph child', () => (
    <Wrapper>
      <P>Hello Wrapper</P>
    </Wrapper>
  ))
  .add('with multiple children', () => (
    <Wrapper>
      <P>Hello Wrapper 1</P>
      <P>Hello <A href="//google.com" external>Wrapper 2</A></P>
      <P>Hello Wrapper 3</P>
    </Wrapper>
  ))
  .add('with BackgroundImg child and fullWidthBg prop', () => (
    <Wrapper fullWidthBg>
      <Element>
        <P style={{ color: 'white' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </P>
      </Element>
      <BackgroundImg imgSrc={background} />
    </Wrapper>
  ));
