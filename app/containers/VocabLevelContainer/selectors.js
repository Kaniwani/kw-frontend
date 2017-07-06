import { createSelector } from 'reselect';

const selectVocabLevelContainerDomain = () => (state) => state.vocabLevelContainer;

const makeSelectVocabLevelContainer = () => createSelector(
  selectVocabLevelContainerDomain(),
  (substate) => substate
);

export default selectVocabLevelContainerDomain;
export {
  makeSelectVocabLevelContainer,
};
