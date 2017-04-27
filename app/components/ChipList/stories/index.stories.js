import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ChipList from '../index';

const generateTextArray = (text = '', count = 20) => Array.from({ length: count }).map((_, i) => `${text}${i}`);

storiesOf('components.ChipList', module)
  .add('single chip', () => <ChipList chips={['chip1']} />)
  .add('multiple chips', () => <ChipList chips={generateTextArray('chip', 30)} />)
  .add('multiple chips with component props', () => (
    <ChipList
      chips={generateTextArray('chip', 5)}
      componentProps={{ textColor: 'white', bgColor: 'black' }}
    />
  ));
