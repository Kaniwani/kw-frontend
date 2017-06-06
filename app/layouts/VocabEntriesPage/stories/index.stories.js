import React from 'react';
import { storiesOf } from '@storybook/react';

import { vocabs } from 'shared/testTables';
import VocabEntriesPage from '../index';

storiesOf('layouts.VocabEntriesPage', module)
  .add('VocabEntriesPage with default props', () => (
    <VocabEntriesPage entries={vocabs} level={27} />
  ));
