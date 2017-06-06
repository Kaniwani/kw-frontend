import React from 'react';
import { storiesOf } from '@storybook/react';
import LandingPage from '../index';

storiesOf('layouts.LandingPage', module)
  .add('single LandingPage with default props', () => <LandingPage />);
