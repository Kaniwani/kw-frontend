import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Section from '../index';

storiesOf('Section', module)
  .add('with paragraph child', () => (
    <Section><p>Hello Section</p></Section>
  ))
  .add('with multiple children', () => (
    <Section>
      <p>Hello Section 1</p>
      <p>Hello Section 2</p>
      <p>Hello Section 3</p>
    </Section>
  ));
