import selectVocabChipListDomain, { makeSelectVocabChipList } from '../selectors';

describe('VocabChipList selectors', () => {
  const state = { vocabChipList: 'winner!' };
  const VocabChipListDomain = selectVocabChipListDomain()(state);
  const selectVocabChipList = makeSelectVocabChipList();

  it('selecting vocabChipList domain state should match snapshot', () => {
    expect(VocabChipListDomain).toMatchSnapshot();
  });

  it('selecting vocabChipList substate should match snapshot', () => {
    expect(selectVocabChipList(state)).toMatchSnapshot();
  });
});
