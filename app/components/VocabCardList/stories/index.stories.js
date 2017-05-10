import React from 'react';
import { storiesOf } from '@kadira/storybook';
import VocabCardList from '../index';

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
  },
  {
    id: 33,
    meanings: ['happy birthday'],
    readings: [{
      kana: 'たんじょうびおめでとう',
      character: '誕生日おめでとう',
    }],
  },
];

storiesOf('components.VocabCardList', module)
  .add('VocabCardList with required props', () => (
    <VocabCardList items={items} />
  ))
  .add('VocabCardList with color prop', () => (
    <VocabCardList items={items} color="blue" />
  ));
