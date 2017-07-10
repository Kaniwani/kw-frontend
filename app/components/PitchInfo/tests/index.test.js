import React from 'react';
import { shallow } from 'enzyme';
import PitchInfo from '../index';

describe('<PitchInfo />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<PitchInfo />)).toMatchSnapshot();
  });
});
