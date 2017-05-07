import React from 'react';
import { storiesOf } from '@kadira/storybook';
import VocabChip from '../index';

storiesOf('components.VocabChip', module)
  .add('VocabChip with required props', () => (
    <VocabChip
      id={Math.random()}
      character="蟹鰐"
    />
  ))
  .add('VocabChip with color prop', () => (
    <VocabChip
      id={Math.random()}
      character="蟹鰐"
      color="green"
    />
  ));
