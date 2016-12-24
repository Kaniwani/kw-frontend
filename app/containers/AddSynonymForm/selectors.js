import { createSelector } from 'reselect';
import selectAddSynonym from 'containers/App/selectors';

/**
 * Other specific selectors
 */
const selectJishoData = () => createSelector(
  selectAddSynonym(),
  (substate) => substate.get('jishoData'),
);

export default selectAddSynonym;

export {
  selectJishoData,
};
