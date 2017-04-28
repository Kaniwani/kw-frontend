import React from 'react';
import { mount } from 'enzyme';
import Wrapper from '../index';

describe('<Wrapper />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = mount(
      <Wrapper>text</Wrapper>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
