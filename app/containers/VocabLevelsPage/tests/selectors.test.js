import selectVocabLevelsPageDomain, { makeSelectVocabLevelsPage } from '../selectors';


describe('VocabLevelsPage selectors', () => {
  const state = { vocabLevelsPage: 'winner!' };
  const VocabLevelsPageDomain = selectVocabLevelsPageDomain()(state);
  const selectVocabLevelsPage = makeSelectVocabLevelsPage();

  it('selecting vocabLevelsPage domain state should match snapshot', () => {
    expect(VocabLevelsPageDomain).toMatchSnapshot();
  });

  it('selecting vocabLevelsPage substate should match snapshot', () => {
    expect(selectVocabLevelsPage(state)).toMatchSnapshot();
  });
});
