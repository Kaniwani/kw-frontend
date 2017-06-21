import React from 'react';
import { shallow } from 'enzyme';

import { levels } from 'shared/testTables';
import VocabLevelList from '../index';

describe('<VocabLevelList />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <VocabLevelList
        levels={levels.slice(30, 38)}
        userWKLevel={34}
        handleLevelLock={jest.fn()}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
