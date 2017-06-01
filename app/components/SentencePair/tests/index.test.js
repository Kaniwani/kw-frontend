import React from 'react';
import { render } from 'enzyme';

import { readings } from 'shared/testTables';
import SentencePair from '../index';

describe('<SentencePair />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = render(
      <SentencePair entry={readings.single[0]} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
