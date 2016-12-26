import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Section from '../index';
import Element from 'components/Element';
import A from 'components/A';
import P from 'components/P';
import background from 'shared/assets/img/backgrounds/home.jpg';
import BackgroundImg from 'components/BackgroundImg';

storiesOf('Section', module)
  .add('with paragraph child', () => (
    <Section><P>Hello Section</P></Section>
  ))
  .add('with multiple children', () => (
    <Section>
      <P>Hello Section 1</P>
      <P>Hello <A href="//google.com" external>Section 2</A></P>
      <P>Hello Section 3</P>
    </Section>
  ))
  .add('with BackgroundImg child and fullWidthBg prop', () => (
    <Section fullWidthBg>
      <Element>
        <P style={{ color: 'white' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </P>
      </Element>
      <BackgroundImg img={background} />
    </Section>
  ));
