import { createSelector } from 'reselect';

// Direct selector to the vocabLevelPage state domain
const selectVocabLevelPageDomain = () => (state) => state.vocabLevelPage;

// Main selector used by VocabLevelPage
const makeSelectVocabLevelPage = () => createSelector(
  selectVocabLevelPageDomain(),
  (substate) => substate
);

// Other specific selectors


export default selectVocabLevelPageDomain;
export {
  makeSelectVocabLevelPage,
};
