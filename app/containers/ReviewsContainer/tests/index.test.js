import React from 'react';
import { mount } from 'enzyme';
import ReviewsPageContainer from '../index';

describe('<ReviewsPageContainer />', () => {
  it('should match baseline snapshot', () => {
    expect(mount(<ReviewsPageContainer />)).toMatchSnapshot();
  });
});
