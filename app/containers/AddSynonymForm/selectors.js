import { createSelector } from 'reselect';
import selectModalDomain from 'containers/Modal/selectors';
/**
 * Direct selector to the addSynonymForm state domain
 */
const selectAddSynonymFormDomain = () => createSelector(
  selectModalDomain,
  (state) => state.get('addSynonymForm'),
);

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
