import 'jest-styled-components';
import React from 'react';
import { shallow } from 'enzyme';
import LockButton from '../index';

describe('<LockButton />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(<LockButton
      title="Unlock level"
      isActionable={false}
      isLocked
      onClick={jest.fn()}
    />);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should adopt props', () => {
    const renderedComponent = shallow(<LockButton
      title="Lock level"
      isActionable
      isLocked={false}
      onClick={jest.fn()}
      color="purple"
      size="4rem"
    />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
