import React from 'react';
import cuid from 'cuid';
import { storiesOf } from '@storybook/react';

import { readings } from 'shared/testTables';
import condenseReadings from 'utils/condenseReadings';
import SentencePair from '../index';

Object.entries(readings).forEach(([key, items]) => {
  storiesOf('components.SentencePair', module)
    .add(`SentencePair ${key}`, () => (
      <div>
        {condenseReadings(items).map((item) => <SentencePair key={cuid()} entry={item} />)}
      </div>
    ));
});
