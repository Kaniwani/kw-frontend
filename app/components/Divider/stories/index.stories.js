import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Divider from '../index';
import Section from 'components/Section';
import Element from 'components/Element';
import P from 'components/P';

storiesOf('Divider', module)
  .add('single', () => <Divider />)
  .add('single with fade', () => <Divider fade />)
  .add('single with fade & color', () => <Divider fade color="purple" />)
  .add('single with fullWidth', () => <Divider fullWidth />)
  .add('single with fullWidth & fade', () => <Divider fullWidth fade />)
  .add('between paragraphs with fullWidth', () => (
    <Section>
      <Element>
        <P align="center">Text center</P>
      </Element>
      <Divider fullWidth />
      <Element>
        <P align="left">Text left</P>
      </Element>
    </Section>
  ));
