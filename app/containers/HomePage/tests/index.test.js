import React from 'react';
import { shallow } from 'enzyme';

import HomePage from '../index';

describe('<HomePage />', () => {
  it('should match the baseline snapshot', () => {
    const renderedComponent = shallow(<HomePage />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
