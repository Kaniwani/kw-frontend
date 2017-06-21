import 'jest-styled-components';
import React from 'react';
import { mount } from 'enzyme';
import Mark from '../index';

describe('<Mark />', () => {
  it('should match baseline snapshot with defaultProps', () => {
    expect(mount(<Mark>Mark me!</Mark>)).toMatchStyledComponentsSnapshot();
  });

  it('should adopt color and bgColor props', () => {
    expect(mount(<Mark color="tomato" bgColor="purple">Mark me!</Mark>)).toMatchStyledComponentsSnapshot();
  });
});
