import React from 'react';
import { storiesOf } from '@kadira/storybook';

import ListItem from 'components/ListItem';
import List from '../index';

const generateTextArray = (text = '', count = 20) => Array.from({ length: count }).map((_, i) => `${text}${i}`);

storiesOf('components.List', module)
  .add('single item', () => <List items={['just me']} component={ListItem} />)
  .add('multiple items', () => <List items={generateTextArray('list-item-', 30)} component={ListItem} />);
