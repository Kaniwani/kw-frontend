import selectVocabLevelPageDomain, { makeSelectVocabLevelPage } from '../selectors';


describe('VocabLevelPage selectors', () => {
  const state = { vocabLevelPage: 'winner!' };
  const VocabLevelPageDomain = selectVocabLevelPageDomain()(state);
  const selectVocabLevelPage = makeSelectVocabLevelPage();

  it('selecting vocabLevelPage domain state should match snapshot', () => {
    expect(VocabLevelPageDomain).toMatchSnapshot();
  });

  it('selecting vocabLevelPage substate should match snapshot', () => {
    expect(selectVocabLevelPage(state)).toMatchSnapshot();
  });
});
