import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { vocabs } from 'utils/tests/testTables';
import VocabCardList from '../index';

storiesOf('components.VocabCardList', module)
  .add('VocabCardList with required props', () => (
    <VocabCardList items={vocabs} />
  ))
  .add('VocabCardList with color prop', () => (
    <VocabCardList items={vocabs} color="blue" />
  ));
