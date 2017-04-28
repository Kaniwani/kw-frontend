import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Chip from 'components/Chip';
import ListItem from '../index';

storiesOf('components.ListItem', module)
  .add('single item as text', () => <ListItem item="ListItem"></ListItem>)
  .add('single item as component', () => <ListItem item={<Chip>Chip</Chip>}></ListItem>);
