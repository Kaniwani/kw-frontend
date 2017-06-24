import React from 'react';
import { storiesOf } from '@storybook/react';
import WelcomePage from '../index';

storiesOf('containers.WelcomePage', module)
  .add('WelcomePage with default props', () => (
    <WelcomePage />
  ));
