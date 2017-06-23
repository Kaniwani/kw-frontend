import React from 'react';
import { mount } from 'enzyme';
import ReviewInfo from '../index';

describe('<ReviewInfo />', () => {
  it('should match baseline snapshot', () => {
    expect(mount(<ReviewInfo />)).toMatchSnapshot();
  });
});
