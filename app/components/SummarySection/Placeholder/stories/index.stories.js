import React from 'react';
import { storiesOf } from '@storybook/react';

import { PLACEHOLDERS } from '../constants';
import Placeholder from '../index';

Object.keys(PLACEHOLDERS).forEach((type) => {
  storiesOf('components.SummarySection.Placeholder', module)
    .add(`Placeholder with type={${type}}`, () => (
      <Placeholder type={type} />
    ));
});
