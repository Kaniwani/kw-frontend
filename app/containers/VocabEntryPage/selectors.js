import { createSelector } from 'reselect';

// Direct selector to the vocabEntryPage state domain
const selectVocabEntryPageDomain = () => (state) => state.vocabEntryPage;

// Main selector used by VocabEntryPage
const makeSelectVocabEntryPage = () => createSelector(
  selectVocabEntryPageDomain(),
  (substate) => substate
);

// Other specific selectors


export default selectVocabEntryPageDomain;
export {
  makeSelectVocabEntryPage,
};
