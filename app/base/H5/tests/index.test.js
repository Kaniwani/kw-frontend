import 'jest-styled-components';
import { shallow } from 'enzyme';
import React from 'react';

import H5 from '../index';

describe('<H5 />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const renderedComponent = shallow(<H5 id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should match styling snapshot', () => {
    expect(shallow(<H5>text</H5>)).toMatchStyledComponentsSnapshot();
  });
});
