import { createSelector } from 'reselect';
import { getState, getVal, makeSelectDomain } from "common/selectors";

export const DOMAIN = "search";
export const selectSearch = makeSelectDomain(DOMAIN);

export const selectSearchIds = createSelector(
  selectSearch,
  getState("ids", [])
);

export const selectIsSearching = createSelector(
  selectSearch,
  getVal("isSearching", Boolean)
);
export const selectIsSearchComplete = createSelector(
  selectSearch,
  getVal("isSearchComplete", Boolean)
);

export default selectSearch;
