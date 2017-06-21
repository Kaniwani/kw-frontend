import 'jest-styled-components';
import { shallow } from 'enzyme';
import React from 'react';

import H6 from '../index';

describe('<H6 />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const renderedComponent = shallow(<H6 id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should match styling snapshot', () => {
    expect(shallow(<H6>text</H6>)).toMatchStyledComponentsSnapshot();
  });
});
