import React from 'react';
import { shallow, mount } from 'enzyme';
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
        handleChange={jest.fn()}
        isChecked={false}
        width="12rem"
        height="4rem"
        toggleOnColor="purple"
        toggleOffColor="tan"
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should change checked state on click', () => {
    const renderedComponent = mount(<ToggleSwitch id="toggle3" name="someToggle3" isChecked />);
    expect(renderedComponent.state('checked')).toEqual(true);
    expect(renderedComponent.find('input').prop('checked')).toEqual(true);

    renderedComponent.simulate('change', { target: { checked: false } });
    expect(renderedComponent.state('checked')).toEqual(false);
    expect(renderedComponent.find('input').prop('checked')).toEqual(false);
  });
});
