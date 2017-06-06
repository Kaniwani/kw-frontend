import React from 'react';
import { storiesOf } from '@storybook/react';

import { vocabs } from 'shared/testTables';
import { TYPES } from '../constants';
import SummarySection from '../index';

Object.keys(TYPES).forEach((type) => {
  storiesOf('components.SummarySection', module)
    .add(`SummarySection with empty items and type={${type}}`, () => (
      <SummarySection type={type} items={[]} />
    ))
    .add(`SummarySection with type={${type}}`, () => (
      <SummarySection type={type} items={vocabs} />
    ))
    .add(`SummarySection with isExpanded={true} and type={${type}}`, () => (
      <SummarySection isExpanded type={type} items={vocabs} />
    ));
});
