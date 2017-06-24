import React from 'react';
import { shallow } from 'enzyme';
import { vocabs } from 'shared/testTables';
import SessionSummaryPage from '../index';

const items = vocabs.map(vocab => ({
  ...vocab,
  history: {
    correct: 4,
    incorrect: 6,
  },
  session: {
    correct: 12,
    incorrect: 3,
    streak: 6,
  },
}));

describe('<SessionSummaryPage />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <SessionSummaryPage
        correctItems={items}
        incorrectItems={items}
        criticalItems={items}
        percentCorrect={24}
        remainingCount={2}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
