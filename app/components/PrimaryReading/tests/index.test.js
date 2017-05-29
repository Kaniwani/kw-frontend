import React from 'react';
import { shallow } from 'enzyme';
import PrimaryReading from '../index';

describe('<PrimaryReading />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<PrimaryReading />)).toMatchSnapshot();
  });
});
