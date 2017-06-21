import 'jest-styled-components';
import { shallow } from 'enzyme';
import React from 'react';

import H2 from '../index';

describe('<H2 />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const renderedComponent = shallow(<H2 id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should match styling snapshot', () => {
    expect(shallow(<H2>text</H2>)).toMatchStyledComponentsSnapshot();
  });
});
