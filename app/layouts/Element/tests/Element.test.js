import React from 'react';
import { shallow } from 'enzyme';
import Element from '../index';

describe('<Element />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <Element>text</Element>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
