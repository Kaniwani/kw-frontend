import { createSelector } from 'reselect';

/**
 * Direct selector to the addSynonymForm state domain
 */
const selectAddSynonymFormDomain = () => (state) => state.get('addSynonymForm');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AddSynonymForm
 */

const selectAddSynonymForm = () => createSelector(
  selectAddSynonymFormDomain(),
  (substate) => substate,
);

export default selectAddSynonymForm;
export {
  selectAddSynonymFormDomain,
};
