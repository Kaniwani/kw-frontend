import React from 'react';
import { storiesOf } from '@kadira/storybook';
import VocabCardList from '../index';

const items = [
  {
    id: 12,
    meaning: 'Before Long, Soon',
    readings: [
      {
        character: '近々',
        kana: 'ちかぢか, きんきん, ちかじか',
      },
      {
        character: '間もなく',
        kana: 'まもなく',
      },
    ],
  },
  {
    id: 234,
    meaning: 'emergency',
    readings: [
      {
        kana: 'ひじょう',
        character: '非常',
      },
      {
        kana: 'きゅうきゅう',
        character: '救急',
      },
      {
        kana: 'きんきゅう',
        character: '緊急',
      },
    ],
  },
];

storiesOf('components.VocabCardList', module)
  .add('VocabCardList with required props', () => (
    <VocabCardList items={items} />
  ))
  .add('VocabCardList with color prop', () => (
    <VocabCardList items={items} color="blue" />
  ));
