import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { vocabs } from 'shared/testTables';
import { SRS_RANKS } from 'shared/constants';
import { TYPES } from '../../constants';
import RankedVocabList from '../index';

Object.keys(TYPES).filter(type => type !== 'critical').forEach((type) => {
  storiesOf('components.SummarySection.RankedVocabList', module)
    .add(`${type} RankedVocabList with rank=${SRS_RANKS.ONE}`, () => (
      <RankedVocabList
        type={type}
        rank={SRS_RANKS.ONE}
        items={vocabs}
        color={TYPES[type].color}
        isExpanded={false}
      />
  ));
});
