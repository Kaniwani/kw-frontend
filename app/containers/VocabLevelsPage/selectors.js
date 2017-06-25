import { createSelector } from 'reselect';

// Direct selector to the vocabLevelsPage state domain
const selectVocabLevelsPageDomain = () => (state) => state.vocabLevelsPage;

// Main selector used by VocabLevelsPage
const makeSelectVocabLevelsPage = () => createSelector(
  selectVocabLevelsPageDomain(),
  (substate) => substate
);

// Other specific selectors


export default selectVocabLevelsPageDomain;
export {
  makeSelectVocabLevelsPage,
};
