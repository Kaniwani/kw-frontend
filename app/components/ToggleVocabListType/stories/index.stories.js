import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ToggleVocabListType from '../index';

storiesOf('components.ToggleVocabListType', module)
  .add('ToggleVocabListType with required props', () => (
    <ToggleVocabListType
      isExpanded
      handleClick={action('clicked!')}
    />
  ));
