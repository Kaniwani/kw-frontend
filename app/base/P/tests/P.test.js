import React from 'react';
import { shallow } from 'enzyme';
import P from '../index';

it('should render its text', () => {
  const children = 'Text';
  const renderedComponent = shallow(
    <P>{children}</P>
  );
  expect(renderedComponent).toMatchSnapshot();
});

it('should adopt a textAlign prop', () => {
  const textAlign = 'center';
  const renderedComponent = shallow(
    <P textAlign={textAlign}>Centered text</P>
  );
  expect(renderedComponent).toMatchSnapshot();
});

it('should adopt an align prop', () => {
  const align = 'center';
  const renderedComponent = shallow(
    <P align={align}>Centered element</P>
  );
  expect(renderedComponent).toMatchSnapshot();
});
