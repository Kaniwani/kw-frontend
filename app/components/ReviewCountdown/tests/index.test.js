import React from 'react';
import { shallow } from 'enzyme';
import ReviewCountdown from '../index';

describe('<ReviewCountdown />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<ReviewCountdown />)).toMatchSnapshot();
  });
});
