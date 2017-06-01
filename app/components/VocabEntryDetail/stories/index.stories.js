import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { vocabs } from 'shared/testTables';
import condenseReadings from 'utils/condenseReadings';

import VocabEntryDetail from '../index';

vocabs.forEach((entry) => {
  storiesOf('components.VocabEntryDetail', module)
  .add(`VocabEntryDetail with default props: ${entry.readings[0].character}`, () => (
    <VocabEntryDetail
      entry={{
        ...entry,
        readings: condenseReadings(entry.readings),
      }}
    />
  ));
});
