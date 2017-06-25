import selectVocabEntryPageDomain, { makeSelectVocabEntryPage } from '../selectors';


describe('VocabEntryPage selectors', () => {
  const state = { vocabEntryPage: 'winner!' };
  const VocabEntryPageDomain = selectVocabEntryPageDomain()(state);
  const selectVocabEntryPage = makeSelectVocabEntryPage();

  it('selecting vocabEntryPage domain state should match snapshot', () => {
    expect(VocabEntryPageDomain).toMatchSnapshot();
  });

  it('selecting vocabEntryPage substate should match snapshot', () => {
    expect(selectVocabEntryPage(state)).toMatchSnapshot();
  });
});
