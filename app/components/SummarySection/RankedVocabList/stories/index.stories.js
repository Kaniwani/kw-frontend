import React from 'react';
import { storiesOf } from '@kadira/storybook';
import random from 'lodash/random';

import { vocabs } from 'utils/tests/testTables';
import { SRS_RANKS } from 'shared/constants';
import { TYPES } from '../../constants';
import RankedVocabList from '../index';

const generateItems = () => vocabs.map((vocab) => ({
  ...vocab,
  history: {
    correct: random(10),
    incorrect: random(10),
  },
  session: {
    correct: random(10),
    incorrect: random(10),
    streak: random(11),
  },
}));

Object.keys(TYPES).filter((type) => type !== 'critical').forEach((type) => {
  storiesOf('components.SummarySection.RankedVocabList', module)
    .add(`${type} RankedVocabList with rank=${SRS_RANKS.ONE}`, () => (
      <RankedVocabList
        type={type}
        rank={SRS_RANKS.ONE}
        items={generateItems()}
        color={TYPES[type].color}
        expanded={false}
      />
  ));
});
