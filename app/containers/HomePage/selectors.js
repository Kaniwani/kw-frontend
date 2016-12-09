/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { selectUser } from 'containers/App/selectors';

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
  (substate) => substate.get('lastWkSyncDate').toDateString(),
);

export default selectHomeDomain;

export {
  selectName,
  selectLevel,
  selectReviewCount,
  selectLastWkSyncDate,
};
