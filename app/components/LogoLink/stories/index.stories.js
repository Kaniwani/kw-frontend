import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoLink from '../index';

storiesOf('components.LogoLink', module)
  .add('single LogoLink with default props', () => <LogoLink />);
