import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MultiLogin from '../index';

storiesOf('containers.MultiLogin', module)
  .add('single MultiLogin with default props', () => <MultiLogin />);
