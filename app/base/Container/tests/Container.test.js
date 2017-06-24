import React from 'react';
import { mount } from 'enzyme';
import Container from '../index';

describe('<Container />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = mount(
      <Container>text</Container>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
