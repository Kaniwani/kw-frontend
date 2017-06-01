import React from 'react';
import { shallow } from 'enzyme';

import { readings } from 'shared/testTables';

import PrimaryReading from '../index';

describe('<PrimaryReading />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<PrimaryReading entry={readings.single[0]} />)).toMatchSnapshot();
  });
});
