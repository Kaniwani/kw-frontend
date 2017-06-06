import React from 'react';
import { storiesOf } from '@storybook/react';

import { vocabs } from 'shared/testTables';
import VocabCard from '../index';

storiesOf('components.VocabCard', module)
  .add('VocabCard with required props', () => (
    <VocabCard
      id={vocabs[0].id}
      meanings={vocabs[0].meanings}
      readings={vocabs[0].readings}
    />
  ))
  .add('VocabCard with color prop', () => (
    <VocabCard
      id={vocabs[1].id}
      meanings={vocabs[1].meanings}
      readings={vocabs[1].readings}
      color="orange"
    />
  ));
