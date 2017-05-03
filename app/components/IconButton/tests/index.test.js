import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '../index';

describe('<IconButton /> ', () => {
  it('should match baseline snapshot of required props', () => {
    const renderedComponent = shallow(
      <IconButton name="ADD" title="Does an action" handleClick={jest.fn()} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
