import 'jest-styled-components';
import React from 'react';
import { shallow } from 'enzyme';
import Ul from '../index';

describe('<Ul />', () => {
  it('should render children', () => {
    expect(shallow(<Ul><li>One</li><li>Two</li></Ul>)).toMatchSnapshot();
  });
  it('should match styling snapshot', () => {
    expect(shallow(<Ul />)).toMatchStyledComponentsSnapshot();
  });
  it('should adopt a plainList prop to reset list styles', () => {
    expect(shallow(<Ul plainList />)).toMatchStyledComponentsSnapshot();
  });
});
