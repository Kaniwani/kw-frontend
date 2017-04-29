import React from 'react';
import { shallow } from 'enzyme';
import Mark from '../index';

describe('<Mark />', () => {
  it('should match baseline snapshot with defaultProps', () => {
    expect(shallow(<Mark>Mark me!</Mark>)).toMatchSnapshot();
  });

  it('should adopt color and bgColor props', () => {
    expect(shallow(<Mark color="tomato" bgColor="purple">Mark me!</Mark>)).toMatchSnapshot();
  });
});
