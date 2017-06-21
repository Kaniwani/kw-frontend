import 'jest-styled-components';
import { shallow } from 'enzyme';
import React from 'react';

import H4 from '../index';

describe('<H4 />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const renderedComponent = shallow(<H4 id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should match styling snapshot', () => {
    expect(shallow(<H4>text</H4>)).toMatchStyledComponentsSnapshot();
  });
});
