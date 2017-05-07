import React from 'react';
import { storiesOf } from '@kadira/storybook';
import VocabChipList from '../index';

const items = [
  {
    id: 42,
    meaning: 'facilities',
    kana: 'しせつ',
    character: '施設',
    correctPercent: 82,
  },
  {
    id: 22,
    meaning: 'dancing',
    kana: 'おどり',
    character: '踊り',
    correctPercent: 95,
  },
  {
    id: 33,
    meaning: 'happy birthday',
    kana: 'たんじょうびおめでとう',
    character: '誕生日おめでとう',
    correctPercent: 12,
  },
];

storiesOf('containers.VocabChipList', module)
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
