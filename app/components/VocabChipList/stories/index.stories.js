import React from 'react';
import { storiesOf } from '@kadira/storybook';
import VocabChipList from '../index';

const items = [
  {
    id: 42,
    meanings: ['facilities', 'establishment'],
    readings: [
      {
        kana: 'しせつ',
        character: '施設',
      },
    ],
    history: {
      correct: 12,
      incorrect: 33,
    },
    session: {
      correct: 1,
      incorrect: 2,
    },
  },
  {
    id: 48,
    meanings: ['dancing', 'hopping'],
    readings: [
      {
        kana: 'おどり',
        character: '踊り',
      },
    ],
    history: {
      correct: 12,
      incorrect: 33,
    },
    session: {
      correct: 1,
      incorrect: 1,
    },
  },
  {
    id: 33,
    meanings: ['happy birthday'],
    readings: [{
      kana: 'たんじょうびおめでとう',
      character: '誕生日おめでとう',
    }],
    history: {
      correct: 4,
      incorrect: 7,
    },
    session: {
      correct: 1,
      incorrect: 0,
    },
  },
];

storiesOf('components.VocabChipList', module)
  .add('VocabChipList with required props', () => (
    <VocabChipList
      items={items}
    />
  ))
  .add('VocabChipList with color prop', () => (
    <VocabChipList
      items={items}
      color="green"
    />
  ));
