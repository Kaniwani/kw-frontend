import React from 'react';
import { storiesOf } from '@storybook/react';

import { vocabs } from 'shared/testTables';
import VocabCardList from '../index';

storiesOf('components.VocabCardList', module)
  .add('VocabCardList with required props', () => (
    <VocabCardList items={vocabs} />
  ))
  .add('VocabCardList with color prop', () => (
    <VocabCardList items={vocabs} color="blue" />
  ));
