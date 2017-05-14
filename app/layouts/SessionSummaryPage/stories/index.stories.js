import React from 'react';
import { storiesOf } from '@kadira/storybook';
import random from 'lodash/random';

import { vocabs } from 'utils/tests/testTables';
import SessionSummaryPage from '../index';

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

storiesOf('layouts.SessionSummaryPage', module)
  .add('SessionSummaryPage with default props', () => (
    <SessionSummaryPage
      correctItems={generateItems()}
      incorrectItems={generateItems()}
      criticalItems={generateItems()}
      percentCorrect={random(100)}
      remainingCount={random(20)}
    />
  ));
