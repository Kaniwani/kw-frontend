import { shallow } from 'enzyme';
import React from 'react';

import H5 from '../index';

describe('<H5 />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const renderedComponent = shallow(
      <H5 id={id} />,
    );
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H5>{children}</H5>,
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
