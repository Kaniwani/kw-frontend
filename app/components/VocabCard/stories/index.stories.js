import React from 'react';
import { storiesOf } from '@kadira/storybook';

import VocabCard from '../index';

const meaning = 'Before Long, Soon';
const readings = [
  {
    character: '近々',
    kana: 'ちかぢか, きんきん, ちかじか',
  },
  {
    character: '間もなく',
    kana: 'まもなく',
  },
];

storiesOf('components.VocabCard', module)
  .add('VocabCard with required props', () => (
    <VocabCard
      id={Math.random()}
      meaning={meaning}
      readings={readings}
    />
  ))
  .add('VocabCard with color prop', () => (
    <VocabCard
      id={Math.random()}
      color="orange"
      meaning={meaning}
      readings={readings}
    />
  ));
