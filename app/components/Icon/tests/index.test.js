import 'jest-styled-components';
import React from 'react';
import { shallow } from 'enzyme';
import Icon from '../index';

describe('<Icon /> ', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(<Icon name="ADD" />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
