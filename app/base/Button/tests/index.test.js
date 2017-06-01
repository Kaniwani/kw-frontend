import React from 'react';
import { mount, render } from 'enzyme';

import Button from '../index';

const href = 'http://google.com';
const to = '/';
const children = (<h1>Test</h1>);
const mountComponent = props => mount(
  <Button {...props}>
    {children}
  </Button>,
);
const renderComponent = props => render(
  <Button {...props}>
    {children}
  </Button>,
);

describe('<Button />', () => {
  it('should match baseline snapshot as A button', () => {
    expect(renderComponent({ href })).toMatchSnapshot();
  });

  it('should match baseline snapshot as Link button', () => {
    expect(renderComponent({ to })).toMatchSnapshot();
  });

  it('should match baseline snapshot as Button button', () => {
    expect(renderComponent({ onClick: jest.fn() })).toMatchSnapshot();
  });

  it('should render an <a> tag if href is specified', () => {
    const mountedComponent = mountComponent({ href });
    expect(mountedComponent.find('a').length).toEqual(1);
  });

  it('should render an <a> tag if "to" prop is specified', () => {
    const mountedComponent = mountComponent({ to });
    expect(mountedComponent.find('a').length).toEqual(1);
  });

  it('should render a <button> tag if the onClick prop is specified', () => {
    const mountedComponent = mountComponent({ onClick: jest.fn() });
    expect(mountedComponent.find('button').length).toEqual(1);
  });

  it('should have children', () => {
    const mountedComponent = mountComponent({ href });
    expect(mountedComponent.contains(children)).toBe(true);
  });

  it('should handle click events', () => {
    const onClickSpy = jest.fn();
    const mountedComponent = mountComponent({ onClick: onClickSpy });
    mountedComponent.simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should not adopt a type attribute when rendering an <a> tag', () => {
    const type = 'submit';
    const mountedComponent = mountComponent({ href, type });
    expect(mountedComponent.find('a').prop('type')).toBeUndefined();
  });

  it('should adopt a type attribute when rendering a button', () => {
    const type = 'submit';
    const mountedComponent = mountComponent({ onClick: jest.fn(), type });
    expect(mountedComponent.find('button').prop('type')).toBeDefined();
  });
});
