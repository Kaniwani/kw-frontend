import React from 'react';
import { mount } from 'enzyme';

import withToggle from '../withToggle';

/* eslint-disable */
const ComponentWithToggle = withToggle(
  ({ isToggled, toggleOn, toggleOff, toggle }) => (
    <div>
      <div id="toggleOn" onClick={toggleOn}>toggleOn handler</div>
      <div id="toggleOff" onClick={toggleOff}>toggleOff handler</div>
      <div id="toggle" onClick={toggle}>toggle handler</div>
      <div id="isToggled">{`${isToggled}`}</div>
    </div>
  )
);
/* eslint-enable */

describe('withToggle', () => {
  const renderedComponent = mount(<ComponentWithToggle />);

  it('isToggled should default to false', () => {
    expect(renderedComponent.find('#isToggled')).toMatchSnapshot();
  });

  it('should have a working toggleOn handler ', () => {
    renderedComponent.find('#toggleOn').simulate('click');
    expect(renderedComponent.find('#isToggled')).toMatchSnapshot();
  });

  it('should have a working toggleOff handler ', () => {
    renderedComponent.find('#toggleOn').simulate('click');
    renderedComponent.find('#toggleOff').simulate('click');
    expect(renderedComponent.find('#isToggled')).toMatchSnapshot();
  });

  it('should have a working toggle handler ', () => {
    const initial = renderedComponent.find('#isToggled').text();
    renderedComponent.find('#toggle').simulate('click');
    expect(renderedComponent.find('#isToggled').text()).not.toEqual(initial);
  });
});
