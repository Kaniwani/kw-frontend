import React from 'react';
import uuid from 'uuid';
import { storiesOf } from '@kadira/storybook';

import { readings } from 'shared/testTables';
import condenseReadings from 'utils/condenseReadings';
import PrimaryReading from '../index';

Object.entries(readings).forEach(([key, items]) => {
  const combinedKanaEntry = condenseReadings(items)[0];
  storiesOf('components.PrimaryReading', module)
    .add(`PrimaryReading ${key}`, () => (
      <PrimaryReading key={uuid()} entry={combinedKanaEntry} />
    ));
});
