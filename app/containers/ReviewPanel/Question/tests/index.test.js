import React from 'react';
import { shallow } from 'enzyme';
import ReviewQuestion from '../index';

describe('<ReviewQuestion />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<ReviewQuestion meaning="large, round" tags={['JLPT N1', 'Noun']} />)).toMatchSnapshot();
  });
});
