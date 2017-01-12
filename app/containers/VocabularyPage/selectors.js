import { createSelector } from 'reselect';

/**
 * Direct selector to the vocabulary state domain
 */
const selectVocabularyDomain = () => (state) => state.get('vocabulary');

/**
 * Other specific selectors
 */
const selectVocabularyLevels = () => createSelector(
   selectVocabularyDomain(),
   (substate) => substate.get('levels'),
 );

const selectVocabularyItems = () => createSelector(
   selectVocabularyDomain(),
   (substate) => substate.get('items'),
 );

const selectVocabularyDetail = () => createSelector(
   selectVocabularyDomain(),
   (substate) => substate.get('item'),
 );

export default selectVocabularyDomain;
export {
  selectVocabularyLevels,
  selectVocabularyItems,
  selectVocabularyDetail,
};
