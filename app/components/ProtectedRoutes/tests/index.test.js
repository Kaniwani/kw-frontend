import React from 'react';
import { mount } from 'enzyme';
import ProtectedRoutes from '../index';

describe('<ProtectedRoutes />', () => {
  it('should match baseline snapshot', () => {
    expect(mount(<ProtectedRoutes />)).toMatchSnapshot();
  });
});
