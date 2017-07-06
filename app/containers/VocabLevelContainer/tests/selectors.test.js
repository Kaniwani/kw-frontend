import selectVocabLevelContainerDomain, { makeSelectVocabLevelContainer } from '../selectors';

describe('VocabLevelContainer selectors', () => {
  const state = { vocabLevelContainer: 'winner!' };
  const VocabLevelContainerDomain = selectVocabLevelContainerDomain()(state);
  const selectVocabLevelContainer = makeSelectVocabLevelContainer();

  it('selecting vocabLevelContainer domain state should match snapshot', () => {
    expect(VocabLevelContainerDomain).toMatchSnapshot();
  });

  it('selecting vocabLevelContainer substate should match snapshot', () => {
    expect(selectVocabLevelContainer(state)).toMatchSnapshot();
  });
});
