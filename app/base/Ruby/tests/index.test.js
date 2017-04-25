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

  it('should render a span when no furi prop is passed', () => {
    const renderedComponent = shallow(
      <Ruby>Plain ol span</Ruby>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
