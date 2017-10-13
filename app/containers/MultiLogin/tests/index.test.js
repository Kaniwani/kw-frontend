import React from 'react';
import { mount } from 'enzyme';
import MultiLogin from '../index';

describe('<MultiLogin />', () => {
  it('should match baseline snapshot', () => {
    const component = mount(
      <MultiLogin />
    );
    expect(component).toMatchSnapshot();
  });
});
