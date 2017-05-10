import React from 'react';
import { shallow } from 'enzyme';
import ScrollTopButton from '../index';

describe('<ScrollTopButton />', () => {
  it('should match the baseline snapshot', () => {
    expect(shallow(<ScrollTopButton onClick={jest.fn()} />)).toMatchSnapshot();
  });
  it('should adopt isVisible and isScrolling props', () => {
    expect(shallow(<ScrollTopButton onClick={jest.fn()} isVisible isScrolling />)).toMatchSnapshot();
  });
});
