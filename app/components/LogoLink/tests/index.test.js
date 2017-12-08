import 'jest-styled-components';
import React from 'react';
import { shallow } from 'enzyme';
import LogoLink from '../index';

describe('<LogoLink />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<LogoLink />)).toMatchSnapshot();
  });
});
