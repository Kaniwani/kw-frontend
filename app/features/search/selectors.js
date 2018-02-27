import { createSelector } from 'reselect';
import { getState, getBy } from 'common/selectors';

export const DOMAIN = 'search';
export const selectSearch = getState(DOMAIN);

export const selectSearchResultIds = createSelector(selectSearch, getState('ids', []));
export const selectIsSearching = createSelector(selectSearch, getBy('isSearching', Boolean));
export const selectIsSearchComplete = createSelector(
  selectSearch,
  getBy('isSearchComplete', Boolean)
);

export default selectSearch;
