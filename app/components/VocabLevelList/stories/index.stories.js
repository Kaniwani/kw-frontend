import React from 'react';
import { storiesOf } from '@kadira/storybook';
import VocabLevelList from '../index';

storiesOf('components.VocabLevelList', module)
  .add('VocabLevelList with default props', () => (
    <VocabLevelList />
  ));
