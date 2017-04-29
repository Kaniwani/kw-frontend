import React from 'react';
import { storiesOf } from '@kadira/storybook';

import LoadingIndicator from '../index';

storiesOf('components.LoadingIndicator', module)
  .add('LoadingIndicator', () => (
    <LoadingIndicator />
  ))
  .add('LoadingIndicator with color prop', () => (
    <LoadingIndicator color="tomato" />
  ));
