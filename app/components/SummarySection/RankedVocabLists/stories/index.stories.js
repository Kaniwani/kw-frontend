import React from 'react';
import { storiesOf } from '@kadira/storybook';
import random from 'lodash/random';

import { vocabs } from 'utils/tests/testTables';
import { TYPES } from '../../constants';
import RankedVocabLists from '../index';

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
  storiesOf('components.SummarySection.RankedVocabLists', module)
    .add(`${type} RankedVocabLists`, () => (
      <RankedVocabLists
        type={type}
        items={generateItems()}
        color={TYPES[type].color}
        expanded={false}
      />
  ));
});
