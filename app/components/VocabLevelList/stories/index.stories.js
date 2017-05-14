import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { levels } from 'utils/tests/testTables';
import VocabLevelList from '../index';

storiesOf('components.VocabLevelList', module)
  .add('VocabLevelList with default props', () => (
    <VocabLevelList
      levels={levels}
      userWKLevel={34}
    />
  ));
