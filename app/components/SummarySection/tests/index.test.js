import React from 'react';
import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { vocabs } from 'shared/testTables';
import { TYPES } from '../constants';
import SummarySection from '../index';


describe('<SummarySection />', () => {
  const SECTION_TYPES = Object.keys(TYPES);
  const items = vocabs.slice(0, 2).map(vocab => ({
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

  it('should adopt all types', () => {
    const renderedComponents = SECTION_TYPES.map(TYPE => render(
      <MemoryRouter>
        <SummarySection
          type={TYPE}
          items={items}
        />
      </MemoryRouter>
    ));
    renderedComponents.forEach(component => expect(component).toMatchSnapshot());
  });

  it('should adopt isExpanded prop', () => {
    const renderedComponent = render(
      <MemoryRouter>
        <SummarySection
          type={SECTION_TYPES[0]}
          items={items}
          isExpanded
        />
      </MemoryRouter>
      );
    expect(renderedComponent).toMatchSnapshot();
  });
});
