import 'jest-styled-components';
import { shallow } from 'enzyme';
import React from 'react';

import Img from '../index';

const src = 'test.png';
const alt = 'test';
const renderComponent = (props = {}) => shallow(<Img src={src} alt={alt} {...props} />);

describe('<Img />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have an src attribute', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.prop('src')).toEqual(src);
  });

  it('should have an alt attribute', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.prop('alt')).toEqual(alt);
  });

  it('should not have a className attribute', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.prop('className')).toBe('');
  });

  it('should adopt a className attribute', () => {
    const className = 'test';
    const renderedComponent = renderComponent({ className });
    expect(renderedComponent.hasClass(className)).toBe(true);
  });

  it('should not adopt a srcset attribute', () => {
    const srcset = 'test-HD.png 2x';
    const renderedComponent = renderComponent({ srcset });
    expect(renderedComponent.prop('srcset')).toBeUndefined();
  });
});
