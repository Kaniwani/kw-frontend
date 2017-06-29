import React from 'react';
import { mount } from 'enzyme';
import HomePage from '../index';

describe('<HomePage />', () => {
  it('should match baseline snapshot', () => {
    expect(mount(<HomePage />)).toMatchSnapshot();
  });
});
