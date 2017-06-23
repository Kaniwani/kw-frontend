import React from 'react';
import { shallow } from 'enzyme';
import ReviewAnswerContainer from '../index';

describe('<ReviewAnswerContainer />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<ReviewAnswerContainer />)).toMatchSnapshot();
  });
});
