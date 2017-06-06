import React from 'react';
import { storiesOf } from '@storybook/react';

import { levels } from 'shared/testTables';
import VocabLevelsPage from '../index';

storiesOf('layouts.VocabLevelsPage', module)
  .add('VocabLevelsPage with default props', () => (
    <VocabLevelsPage
      levels={levels}
      userWKLevel={26}
    />
  ));
