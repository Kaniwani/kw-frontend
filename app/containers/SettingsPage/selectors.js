import { createSelector } from 'reselect';

/**
 * Direct selector to the settingsPage state domain
 */
const selectSettingsPageDomain = () => (state) => state.get('settingsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SettingsPage
 */

const selectSettingsPage = () => createSelector(
  selectSettingsPageDomain(),
  (substate) => substate.toJS()
);

export default selectSettingsPage;
export {
  selectSettingsPageDomain,
};
