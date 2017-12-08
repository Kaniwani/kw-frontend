import 'jest-styled-components';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Button from '../index';

const href = 'http://google.com';
const to = '/';
const children = <h1>Test</h1>;
const mountComponent = (props) => {
  const wrapped = (
    <MemoryRouter>
      <Button {...props}>{children}</Button>
    </MemoryRouter>
  );
  return mount(wrapped);
};
const shallowComponent = (props) =>
  shallow(<Button {...props}>{children}</Button>);

describe('<Button />', () => {
  it('should match baseline snapshot as A button', () => {
    expect(shallowComponent({ href })).toMatchSnapshot();
  });

  it('should match baseline snapshot as Link button', () => {
    expect(shallowComponent({ to })).toMatchSnapshot();
  });

  it('should match baseline snapshot as Button button', () => {
    expect(shallowComponent({ onClick: jest.fn() })).toMatchSnapshot();
  });

  it('should render an <a> tag if href is specified', () => {
    expect(mountComponent({ href }).find('a').length).toEqual(1);
  });

  it('should render an <a> tag if "to" prop is specified', () => {
    expect(mountComponent({ to }).find('a').length).toEqual(1);
  });

  it('should render a <button> tag if the onClick prop is specified', () => {
    expect(mountComponent({ onClick: jest.fn() }).find('button').length).toEqual(1);
  });

  it('should have children', () => {
    expect(mountComponent({ href }).contains(children)).toBe(true);
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
