import { shallow } from 'enzyme';
import React from 'react';

import A from '../index';

const href = 'http://google.com/';
const to = '/someRoute';
const children = (<h1>Test</h1>);
const renderComponent = (props = {}) => shallow(
  <A {...props}>
    {children}
  </A>,
);

describe('<A />', () => {
  it('should match snapshot for <a>', () => {
    const renderedComponent = renderComponent({ href, plainLink: true });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should match snapshot for <Link>', () => {
    const renderedComponent = renderComponent({ to });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have children', () => {
    const renderedComponent = renderComponent({ href });
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should have an href attribute when passed prop', () => {
    const renderedComponent = renderComponent({ href });
    expect(renderedComponent.prop('href')).toEqual(href);
  });

  it('should have a "to" attribute when passed prop', () => {
    const renderedComponent = renderComponent({ to });
    expect(renderedComponent.prop('to')).toEqual(to);
  });

  it('should add appropriate attributes for an external link', () => {
    const renderedComponent = renderComponent({ href, external: true });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should adopt a target attribute', () => {
    const target = '_blank';
    const renderedComponent = renderComponent({ href, target });
    expect(renderedComponent.prop('target')).toEqual(target);
  });

  it('should adopt a type attribute', () => {
    const type = 'text/html';
    const renderedComponent = renderComponent({ href, type });
    expect(renderedComponent.prop('type')).toEqual(type);
  });
});
