import React from 'react';
import { shallow } from 'enzyme';
import Chip from '../index';

describe('<Chip />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <Chip>text</Chip>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
