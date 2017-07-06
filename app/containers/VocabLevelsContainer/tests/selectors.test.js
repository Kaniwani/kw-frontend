import selectVocabLevelsContainerDomain, { makeSelectVocabLevelsContainer } from '../selectors';

describe('VocabLevelsContainer selectors', () => {
  const state = { vocabLevelsContainer: 'winner!' };
  const VocabLevelsContainerDomain = selectVocabLevelsContainerDomain()(state);
  const selectVocabLevelsContainer = makeSelectVocabLevelsContainer();

  it('selecting vocabLevelsContainer domain state should match snapshot', () => {
    expect(VocabLevelsContainerDomain).toMatchSnapshot();
  });

  it('selecting vocabLevelsContainer substate should match snapshot', () => {
    expect(selectVocabLevelsContainer(state)).toMatchSnapshot();
  });
});
