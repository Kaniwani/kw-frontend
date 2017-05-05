import React from 'react';
import { mount } from 'enzyme';
import LandingPage from '../index';

describe('<LandingPage />', () => {
  it('should match baseline snapshot', () => {
    expect(mount(<LandingPage />)).toMatchSnapshot();
  });
});
