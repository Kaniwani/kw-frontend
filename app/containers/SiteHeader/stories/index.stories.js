import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SiteHeader from '../index';

storiesOf('SiteHeader', module)
  .add('header!', () => <SiteHeader />);
