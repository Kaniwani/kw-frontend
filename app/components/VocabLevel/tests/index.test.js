import React from 'react';
import { shallow } from 'enzyme';

import { levels } from 'shared/testTables';
import VocabLevel from '../index';

describe('<VocabLevel />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <VocabLevel
        {...levels[11]}
        handleLevelLock={jest.fn()}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should adopt props', () => {
    const renderedComponent = shallow(
      <VocabLevel
        {...levels[11]}
        handleLevelLock={jest.fn()}
        isActionable
        isLocked={false}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
