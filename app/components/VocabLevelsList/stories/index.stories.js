import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { levels } from 'shared/testTables';
import VocabLevelsList from '../index';

storiesOf('components.VocabLevelsList', module)
  .add('VocabLevelsList with default props', () => (
    <VocabLevelsList
      levels={levels}
      userWKLevel={34}
      handleLevelLock={(level) => action(`handle level lock: level ${level}`)}
    />
  ));
