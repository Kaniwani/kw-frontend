import React from 'react';
import { mount } from 'enzyme';
import ReviewsPage from '../index';

describe('<ReviewsPage />', () => {
  it('should match baseline snapshot', () => {
    expect(mount(<ReviewsPage />)).toMatchSnapshot();
  });
});
