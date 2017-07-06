import { createSelector } from 'reselect';

const selectVocabLevelsContainerDomain = () => (state) => state.vocabLevelsContainer;

const makeSelectVocabLevelsContainer = () => createSelector(
  selectVocabLevelsContainerDomain(),
  (substate) => substate
);

export default selectVocabLevelsContainerDomain;
export {
  makeSelectVocabLevelsContainer,
};
