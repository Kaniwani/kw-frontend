import React from 'react';
import { storiesOf } from '@storybook/react';

import { vocabs } from 'shared/testTables';
import VocabEntryPage from '../index';

const entry = [...vocabs][0];

storiesOf('layouts.VocabEntryPage', module)
  .add('VocabEntryPage with default props', () => (
    <VocabEntryPage entry={entry} />
  ));
