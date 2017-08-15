import React from 'react';
import { shallow } from 'enzyme';

import { vocabs } from 'shared/testTables';
import VocabChipList from '../index';

describe('<VocabChipList />', () => {
  const items = vocabs.slice(0, 3).map((vocab) => ({
    ...vocab,
    history: {
      correct: 4,
      incorrect: 2,
    },
    session: {
      correct: 1,
      incorrect: 1,
    },
  }));

  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <VocabChipList
        items={items}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should adopt a color prop', () => {
    const renderedComponent = shallow(
      <VocabChipList
        items={items}
        color="green"
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
