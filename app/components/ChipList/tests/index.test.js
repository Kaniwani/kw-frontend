import React from 'react';
import { shallow } from 'enzyme';

import ChipList from '../index';

describe('<ChipList />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <ChipList chips={['chip1', 'chip2']} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should adopt component props', () => {
    const renderedComponent = shallow(
      <ChipList componentProps={{ color: 'purple', bgColor: 'whiteLight' }} chips={['chip1', 'chip2']} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
