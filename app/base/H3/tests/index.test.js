import 'jest-styled-components';
import { shallow } from 'enzyme';
import React from 'react';

import H3 from '../index';

describe('<H3 />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const renderedComponent = shallow(<H3 id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should match styling snapshot', () => {
    expect(shallow(<H3>text</H3>)).toMatchStyledComponentsSnapshot();
  });
});
