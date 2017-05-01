import React from 'react';
import { shallow } from 'enzyme';
import ReviewPanel from '../index';

describe('<ReviewPanel />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<ReviewPanel />)).toMatchSnapshot();
  });
});
