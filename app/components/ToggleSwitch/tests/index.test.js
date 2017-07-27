import 'jest-styled-components';
import React from 'react';
import { mount } from 'enzyme';
import ToggleSwitch from '../index';

describe('<ToggleSwitch />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = mount(
      <ToggleSwitch
        id="toggle1"
        name="someToggle1"
        checked
        onChange={() => {}}
      />
    );
    expect(renderedComponent).toMatchStyledComponentsSnapshot();
  });

  it('should adopt custom props', () => {
    const renderedComponent = mount(
      <ToggleSwitch
        id="toggle2"
        name="someToggle2"
        isToggled={false}
        width="12rem"
        height="4rem"
        toggleOnColor="purple"
        toggleOffColor="tan"
      />
    );
    expect(renderedComponent).toMatchStyledComponentsSnapshot();
  });
});
