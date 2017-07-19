import React from 'react';
import { shallow } from 'enzyme';
import Reading from '../index';

describe('<Reading />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<Reading />)).toMatchSnapshot();
  });
});
