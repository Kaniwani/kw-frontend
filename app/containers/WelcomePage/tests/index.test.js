import React from 'react';
import { mount } from 'enzyme';
import WelcomePage from '../index';

describe('<WelcomePage />', () => {
  it('should match baseline snapshot', () => {
    expect(mount(<WelcomePage />)).toMatchSnapshot();
  });
});
