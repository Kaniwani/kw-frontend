import { createSelector } from 'reselect';

// Direct selector to the homepage state domain
const selectHomePageDomain = () => state => state.homepage;

// Main selector used by HomePage
const makeSelectHomePage = () => createSelector(
  selectHomePageDomain(),
  substate => substate
);

// Other specific selectors

export default selectHomePageDomain;
export {
  makeSelectHomePage,
};
