import React from 'react';
import { shallow, mount } from 'enzyme';
import Ul from '../index';

describe('<Ul />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<Ul />)).toMatchSnapshot();
  });
  it('should render children', () => {
    expect(shallow(<Ul><li>One</li><li>Two</li></Ul>)).toMatchSnapshot();
  });
  it('should adopt a plainList prop to reset list styles', () => {
    expect(mount(<Ul plainList />)).toMatchSnapshot();
  });
});
