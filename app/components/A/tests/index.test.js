/**
 * Testing our link component
 */

import { shallow } from 'enzyme';
import React from 'react';

import A from '../index';


const href = 'http://mxstbr.com/';
const children = (<h1>Test</h1>);
const renderComponent = (props = {}) => shallow(
  <A href={href} {...props}>
    {children}
  </A>,
);

describe('<A />', () => {
  it('should have an href attribute', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.prop('href')).toEqual(href);
  });

  it('should have children', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should adopt a target attribute', () => {
    const target = '_blank';
    const renderedComponent = renderComponent({ target });
    expect(renderedComponent.prop('target')).toEqual(target);
  });

  it('should adopt a type attribute', () => {
    const type = 'text/html';
    const renderedComponent = renderComponent({ type });
    expect(renderedComponent.prop('type')).toEqual(type);
  });
});
