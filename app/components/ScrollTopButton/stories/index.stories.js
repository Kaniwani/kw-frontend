import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { action } from '@kadira/storybook-addon-actions';

import ScrollTopButton from '../index';

storiesOf('components.ScrollTopButton', module)
  .add('ScrollTopButton with isVisible true (default: false)', () => (
    <ScrollTopButton onClick={action('scroll-clicked')} isVisible />
  ));
