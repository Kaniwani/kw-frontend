import React from 'react';
import { render } from 'enzyme';
import { readings } from 'shared/testTables';
import condenseReadings from 'utils/condenseReadings';

import PrimaryReading from '../index';

Object.entries(readings).forEach(([key, items]) => {
  const combinedKanaEntry = condenseReadings(items)[0];
  describe(`<PrimaryReading /> ${key}`, () => {
    it(`${key} should match baseline snapshot`, () => {
      expect(render(<PrimaryReading entry={combinedKanaEntry} />)).toMatchSnapshot();
    });
  });
});
