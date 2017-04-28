import React from 'react';
import { mount } from 'enzyme';
import Element from '../index';

describe('<Element />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = mount(
      <Element>text</Element>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
