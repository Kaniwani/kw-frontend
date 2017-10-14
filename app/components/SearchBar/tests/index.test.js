import React from 'react';
import { mount } from 'enzyme';
import SearchBar from '../index';

describe('<SearchBar />', () => {
  it('should match baseline snapshot', () => {
    expect(mount(<SearchBar />)).toMatchSnapshot();
  });
});
