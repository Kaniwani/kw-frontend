import React from 'react';
import { shallow } from 'enzyme';
import Container from '../index';

describe('<Container />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <Container>text</Container>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
