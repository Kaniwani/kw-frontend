import React from 'react';
import { shallow } from 'enzyme';

import { vocabs } from 'utils/tests/testTables';
import { PARTS_OF_SPEECH } from 'shared/constants';

import ReadingHeader from '../index';

describe('<ReadingHeader />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <ReadingHeader
        id={vocabs[0].id}
        primaryCharacter={vocabs[0].primaryCharacter}
        tags={PARTS_OF_SPEECH.slice(4, 10)}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
