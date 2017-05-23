import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { vocabs } from 'utils/tests/testTables';
import VocabEntriesPage from '../index';

storiesOf('layouts.VocabEntriesPage', module)
  .add('VocabEntriesPage with default props', () => (
    <VocabEntriesPage entries={vocabs} level={27} />
  ));
