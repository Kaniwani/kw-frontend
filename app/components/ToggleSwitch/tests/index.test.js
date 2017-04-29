import React from 'react';
import { shallow } from 'enzyme';
import ToggleSwitch from '../index';

describe('<ToggleSwitch />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(<ToggleSwitch id="toggle1" name="someToggle1" isChecked />);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should adopt custom props', () => {
    const renderedComponent = shallow(
      <ToggleSwitch
        id="toggle2"
        name="someToggle2"
        handleClick={() => 'handled'}
        isChecked={false}
        width="12rem"
        height="4rem"
        toggleOnColor="purple"
        toggleOffColor="tan"
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
