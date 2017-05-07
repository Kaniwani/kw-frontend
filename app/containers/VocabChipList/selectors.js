import { createSelector } from 'reselect';

// Direct selector to the vocabChipList state domain
const selectVocabChipListDomain = () => (state) => state.vocabChipList;

// Default selector used by VocabChipList
const makeSelectVocabChipList = () => createSelector(
  selectVocabChipListDomain(),
  (substate) => substate
);

// Other specific selectors

export default selectVocabChipListDomain;
export {
  makeSelectVocabChipList,
};
