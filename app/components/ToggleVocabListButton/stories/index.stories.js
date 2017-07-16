import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ToggleVocabListButton from '../index';

storiesOf('components.ToggleVocabListButton', module)
  .add('ToggleVocabListButton with required props', () => (
    <ToggleVocabListButton
      isExpanded
      handleClick={action('clicked!')}
    />
  ));
