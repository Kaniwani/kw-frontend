import 'jest-styled-components';
import React from 'react';
import { render } from 'enzyme';
import ToggleVocabListButton from '../index';

describe('<ToggleVocabListButton />', () => {
  it('should match expanded snapshot', () => {
    const renderedComponent = render(<ToggleVocabListButton
      cardsExpanded
      toggleCardsExpanded={jest.fn()}
    />);

    expect(renderedComponent).toMatchSnapshot();
  });
  it('should match contracted snapshot', () => {
    const renderedComponent = render(<ToggleVocabListButton
      cardsExpanded={false}
      toggleCardsExpanded={jest.fn()}
    />);

    expect(renderedComponent).toMatchSnapshot();
  });
});
