import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ToggleVocabListType from '../index';

storiesOf('components.ToggleVocabListType', module)
  .add('ToggleVocabListType with required props', () => (
    <ToggleVocabListType
      isExpanded
      handleClick={action('clicked!')}
    />
  ));
