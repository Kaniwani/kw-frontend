import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { levels } from 'shared/testTables';
import VocabLevelList from '../index';

storiesOf('components.VocabLevelList', module)
  .add('VocabLevelList with default props', () => (
    <VocabLevelList
      levels={levels}
      userWKLevel={34}
      handleLevelLock={level => action(`handle level lock: level ${level}`)}
    />
  ));
