import React from 'react';
import { shallow } from 'enzyme';

import { levels } from 'shared/testTables';
import VocabLevelsList from '../index';

describe('<VocabLevelsList />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <VocabLevelsList
        levels={levels.slice(30, 38)}
        userWKLevel={34}
        handleLevelLock={jest.fn()}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
