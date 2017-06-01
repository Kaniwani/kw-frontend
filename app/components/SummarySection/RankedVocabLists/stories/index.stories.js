import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { vocabs } from 'shared/testTables';
import { TYPES } from '../../constants';
import RankedVocabLists from '../index';

Object.keys(TYPES).filter(type => type !== 'critical').forEach((type) => {
  storiesOf('components.SummarySection.RankedVocabLists', module)
    .add(`${type} RankedVocabLists`, () => (
      <RankedVocabLists
        type={type}
        items={vocabs}
        color={TYPES[type].color}
        isExpanded={false}
      />
  ));
});
