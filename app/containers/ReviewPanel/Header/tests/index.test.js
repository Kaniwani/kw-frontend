import React from 'react';
import { shallow } from 'enzyme';
import ReviewHeader from '../index';

describe('<ReviewHeader />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<ReviewHeader />)).toMatchSnapshot();
  });
});
