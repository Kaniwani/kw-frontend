import React from 'react';
import { shallow } from 'enzyme';
import AccuracyBar from '../index';

describe('<AccuracyBar />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<AccuracyBar />)).toMatchSnapshot();
  });
  it('should adopt percent and color props', () => {
    expect(shallow(<AccuracyBar percent={24} color="green" />)).toMatchSnapshot();
  });
});
