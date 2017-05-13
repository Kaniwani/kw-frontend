import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import VocabLevel from '../index';

storiesOf('components.VocabLevel', module)
  .add('VocabLevel with required props', () => (
    <VocabLevel
      level={12}
      handleLevelLock={action('handleLevelLock')}
    />
  ))
  .add('VocabLevel with isLocked={true} & isActionable={true}', () => (
    <VocabLevel
      level={12}
      handleLevelLock={action('handleLevelLock')}
      isLocked
      isActionable
    />
  ))
  .add('VocabLevel with isLocked={false} & isActionable={true}', () => (
    <VocabLevel
      level={12}
      handleLevelLock={action('handleLevelLock')}
      isLocked={false}
      isActionable
    />
  ));
