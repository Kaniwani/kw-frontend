/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { selectUser } from 'containers/App/selectors';
import format from 'date-fns/format';
import { DATE_IN_WORDS } from 'shared/constants';


const selectHomeDomain = () => (state) => state.get('home');

const selectName = () => createSelector(
  selectUser(),
  (substate) => substate.get('name'),
);
const selectLevel = () => createSelector(
  selectUser(),
  (substate) => substate.get('level'),
);
const selectReviewCount = () => createSelector(
  selectUser(),
  (substate) => substate.get('reviewCount'),
);
const selectLastWkSyncDate = () => createSelector(
  selectUser(),
  (substate) => {
    const syncDate = substate.get('lastWkSyncDate');
    return syncDate != null ? format(syncDate, DATE_IN_WORDS) : 'No recent sync data.';
  },
);

export default selectHomeDomain;

export {
  selectName,
  selectLevel,
  selectReviewCount,
  selectLastWkSyncDate,
};
