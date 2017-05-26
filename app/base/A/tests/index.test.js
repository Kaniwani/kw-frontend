import { shallow, render } from 'enzyme';
import React from 'react';

import A from '../index';

const href = 'http://google.com/';
const to = '/someRoute';
const children = (<h1>Test</h1>);

const shallowComponent = (props = {}) => shallow(
  <A {...props}>
    {children}
  </A>,
);

describe('<A />', () => {
  it('should match snapshot for <a>', () => {
    const renderedComponent = shallowComponent({ href, plainLink: true });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should match snapshot for <Link>', () => {
    const renderedComponent = shallowComponent({ to });
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have children', () => {
    const renderedComponent = shallowComponent({ href });
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should have an href attribute when passed prop', () => {
    const renderedComponent = shallowComponent({ href });
    expect(renderedComponent.prop('href')).toEqual(href);
  });

  it('should have a "to" attribute when passed prop', () => {
    const renderedComponent = shallowComponent({ to });
    expect(renderedComponent.prop('to')).toEqual(to);
  });

  it('should add appropriate attributes for an external link', () => {
    const renderedComponent = render(
      <A href={href} external>{children}</A>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
