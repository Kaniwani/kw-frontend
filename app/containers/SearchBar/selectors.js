import { createSelector } from 'reselect';

// Direct selector to the searchBar state domain
const selectSearchBarDomain = () => (state) => state.searchBar;

// Main selector used by SearchBar
const makeSelectSearchBar = () => createSelector(
  selectSearchBarDomain(),
  (substate) => substate
);

// Other specific selectors


export default selectSearchBarDomain;
export {
  makeSelectSearchBar,
};
