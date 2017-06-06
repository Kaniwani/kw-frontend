import React from 'react';
import { storiesOf } from '@storybook/react';
import Img from '../index';

storiesOf('base.Img', module)
  .add('Normal img', () => (
    <Img src="http://fillmurray.com/900/600" alt="Bill Murray" />
  ));
