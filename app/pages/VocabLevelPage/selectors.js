import { createSelector } from 'reselect';

const selectVocabLevelDomain = (state) => state.vocabLevel;

export const selectLevelsLoading = createSelector(
  selectVocabLevelDomain,
  (levels) => levels.loading
);

export const makeSelectLevelLoading = (id) => createSelector(
  selectLevelsLoading,
  (loading) => loading.includes(id)
);

export default selectVocabLevelDomain;
