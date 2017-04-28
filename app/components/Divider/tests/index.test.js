import React from 'react';
import { shallow } from 'enzyme';
import Divider from '../index';

describe('<Divider />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<Divider />)).toMatchSnapshot();
  });
});
