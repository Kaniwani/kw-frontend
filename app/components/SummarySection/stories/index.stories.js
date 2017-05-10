import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { TYPES } from '../constants';
import SummarySection from '../index';

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
      correct: 9,
      incorrect: 31,
    },
    session: {
      correct: 1,
      incorrect: 1,
    },
  },
  { id: 244,
    meanings: ['before long', 'soon'],
    readings: [
      {
        character: '近々',
        kana: 'ちかぢか',
      },
      {
        character: '近々',
        kana: 'きんきん',
      },
      {
        character: '近々',
        kana: 'ちかじか',
      },
      {
        character: '間もなく',
        kana: 'まもなく',
      },
    ],
    history: {
      correct: 4,
      incorrect: 7,
    },
    session: {
      correct: 1,
      incorrect: 0,
    },
  },
  {
    id: 234,
    meanings: ['emergency'],
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
    history: {
      correct: 6,
      incorrect: 3,
    },
    session: {
      correct: 1,
      incorrect: 0,
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
      correct: 11,
      incorrect: 2,
    },
    session: {
      correct: 1,
      incorrect: 1,
    },
  },
];

Object.keys(TYPES).forEach((type) => {
  storiesOf('components.SummarySection', module)
    .add(`SummarySection with empty items and type={${type}}`, () => (
      <SummarySection type={type} items={[]} />
    ))
    .add(`SummarySection with type={${type}}`, () => (
      <SummarySection type={type} items={items} />
    ))
    .add(`SummarySection with expanded={true} and type={${type}}`, () => (
      <SummarySection expanded type={type} items={items} />
    ));
});
