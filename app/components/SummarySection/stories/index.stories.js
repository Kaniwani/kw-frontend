import React from 'react';
import { storiesOf } from '@kadira/storybook';
import random from 'lodash/random';

import { vocabs } from 'utils/tests/testTables';
import { TYPES } from '../constants';
import SummarySection from '../index';

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

Object.keys(TYPES).forEach((type) => {
  storiesOf('components.SummarySection', module)
    .add(`SummarySection with empty items and type={${type}}`, () => (
      <SummarySection type={type} items={[]} />
    ))
    .add(`SummarySection with type={${type}}`, () => (
      <SummarySection type={type} items={generateItems()} />
    ))
    .add(`SummarySection with expanded={true} and type={${type}}`, () => (
      <SummarySection expanded type={type} items={generateItems()} />
    ));
});
