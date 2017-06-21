import 'jest-styled-components';
import { shallow } from 'enzyme';
import React from 'react';

import H1 from '../index';

describe('<H1 />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const renderedComponent = shallow(<H1 id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should match styling snapshot', () => {
    expect(shallow(<H1>text</H1>)).toMatchStyledComponentsSnapshot();
  });
});
