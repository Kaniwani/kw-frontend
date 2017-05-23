import React from 'react';
import { storiesOf } from '@kadira/storybook';
import random from 'lodash/random';

import { vocabs } from 'utils/tests/testTables';
import SessionSummaryPage from '../index';

storiesOf('layouts.SessionSummaryPage', module)
  .add('SessionSummaryPage with default props', () => (
    <SessionSummaryPage
      correctItems={vocabs}
      incorrectItems={vocabs}
      criticalItems={vocabs}
      percentCorrect={random(100)}
      remainingCount={random(20)}
    />
  ));
