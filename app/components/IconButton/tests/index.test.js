import React from 'react';
import { render, mount } from 'enzyme';
import IconButton from '../index';

describe('<IconButton /> ', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = render(
      <IconButton name="ADD" title="Does an action" />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should adopt button types', () => {
    const renderedComponent = render(
      <IconButton type="submit" name="ADD" title="Does an action" handleClick={jest.fn()} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should handle clicks', () => {
    const handleClickSpy = jest.fn();
    const renderedComponent = mount(
      <IconButton type="submit" name="ADD" title="Does an action" handleClick={handleClickSpy} />
    );
    renderedComponent.find('button').simulate('click');
    expect(handleClickSpy).toHaveBeenCalled();
  });
});
