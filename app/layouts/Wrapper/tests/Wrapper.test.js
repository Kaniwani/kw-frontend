import React from 'react';
import { shallow } from 'enzyme';
import Wrapper from '../index';

describe('<Wrapper />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <Wrapper>text</Wrapper>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
