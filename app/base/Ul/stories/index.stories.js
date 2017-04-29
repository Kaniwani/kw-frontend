import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Ul from '../index';

storiesOf('base.Ul', module)
  .add('single Ul with default props', () => <Ul />);
