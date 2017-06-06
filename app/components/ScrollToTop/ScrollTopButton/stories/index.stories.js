import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ScrollTopButton from '../index';

storiesOf('components.ScrollTopButton', module)
  .add('ScrollTopButton with isVisible true (default: false)', () => (
    <ScrollTopButton onClick={action('scroll-clicked')} isVisible />
  ));
