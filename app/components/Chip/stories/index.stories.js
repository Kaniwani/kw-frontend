import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Chip from '../index';
import List from 'components/List';

storiesOf('Chip', module)
  .add('single', () => <Chip item="Chippy chip" />)
  .add('single with color props', () => <Chip item="Chippy chip" textColor="white" bgColor="black" />)
  .add('multiple in a <List />', () => (
    <List component={Chip} items={['Chipper', 'Chippity', 'Chip']} />
  ));
