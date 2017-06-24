import React from 'react';
import { mount } from 'enzyme';
import SettingsPage from '../index';

describe('<SettingsPage />', () => {
  it('should match baseline snapshot', () => {
    expect(mount(<SettingsPage />)).toMatchSnapshot();
  });
});
