import React from 'react';
import { shallow } from 'enzyme';

import Ruby from '../index';

describe('<Ruby />', () => {
  it('should render a Ruby tag with RB and RT children when passed furi prop', () => {
    const renderedComponent = shallow(
      <Ruby furi="かんじ">漢字</Ruby>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render a <span> tag when furi prop is empty', () => {
    const renderedComponent = shallow(
      <Ruby>Without rt</Ruby>
    );
    expect(renderedComponent.find('ruby').exists()).toBe(false);
    expect(renderedComponent).toMatchSnapshot();
  });
});
