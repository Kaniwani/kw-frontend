import { createSelector } from 'reselect';

/**
 * Direct selector to the vocabularyPage state domain
 */
const selectVocabularyPageDomain = () => (state) => state.get('vocabularyPage');

/**
 * Other specific selectors
 */
const selectVocabularyLevels = () => createSelector(
   selectVocabularyPageDomain(),
   (substate) => substate.get('levels'),
 );


export default selectVocabularyPageDomain;
export {
  selectVocabularyLevels,
};
