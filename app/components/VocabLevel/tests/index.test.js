import React from 'react';
import { shallow } from 'enzyme';
import VocabLevel from '../index';

describe('<VocabLevel />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <VocabLevel
        level={12}
        handleLevelLock={jest.fn()}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should adopt props', () => {
    const renderedComponent = shallow(
      <VocabLevel
        level={22}
        handleLevelLock={jest.fn()}
        isActionable
        isLocked={false}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
