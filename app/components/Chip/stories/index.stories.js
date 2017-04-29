import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Chip from '../index';

storiesOf('components.Chip', module)
  .add('single', () => <Chip>Chippy chip</Chip>)
  .add('single with color props', () => <Chip color="white" bgColor="black">Chippy chip</Chip>);
