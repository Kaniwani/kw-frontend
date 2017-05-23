import React from 'react';
import { shallow } from 'enzyme';

import { vocabs } from 'utils/tests/testTables';
import VocabEntriesPage from '../index';

describe('<VocabEntriesPage />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <VocabEntriesPage entries={vocabs} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
