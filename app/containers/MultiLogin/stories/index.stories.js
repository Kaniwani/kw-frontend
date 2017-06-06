import React from 'react';
import { storiesOf } from '@storybook/react';
import MultiLogin from '../index';

storiesOf('containers.MultiLogin', module)
  .add('single MultiLogin with default props', () => <MultiLogin />);
