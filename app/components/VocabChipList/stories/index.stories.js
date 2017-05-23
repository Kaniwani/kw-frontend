import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { vocabs } from 'utils/tests/testTables';
import VocabChipList from '../index';

storiesOf('components.VocabChipList', module)
  .add('VocabChipList with required props', () => (
    <VocabChipList
      items={vocabs}
    />
  ))
  .add('VocabChipList with color prop', () => (
    <VocabChipList
      items={vocabs}
      color="green"
    />
  ));
