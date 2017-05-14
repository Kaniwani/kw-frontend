import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { levels } from 'utils/tests/testTables';
import VocabLevelsPage from '../index';

storiesOf('layouts.VocabLevelsPage', module)
  .add('VocabLevelsPage with default props', () => (
    <VocabLevelsPage
      levels={levels}
      userWKLevel={26}
    />
  ));
