import H4 from '../index';

import { shallow } from 'enzyme';
import React from 'react';

describe('<H4 />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const renderedComponent = shallow(
      <H4 id={id} />,
    );
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H4>{children}</H4>,
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
