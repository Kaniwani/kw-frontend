import React from 'react';
import { shallow } from 'enzyme';

import { levels } from 'shared/testTables';
import VocabLevelsPage from '../index';

describe('<VocabLevelsPage />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <VocabLevelsPage
        levels={levels.slice(30, 38)}
        userWKLevel={34}
        handleLevelLock={jest.fn()}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
