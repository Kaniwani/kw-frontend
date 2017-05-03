import React from 'react';
import { shallow } from 'enzyme';
import ReviewAnswer from '../index';

describe('<ReviewAnswer />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<ReviewAnswer />)).toMatchSnapshot();
  });
});
