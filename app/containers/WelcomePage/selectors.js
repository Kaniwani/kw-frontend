import { createSelector } from 'reselect';

// Direct selector to the welcomePage state domain
const selectWelcomePageDomain = () => (state) => state.welcomePage;

// Main selector used by WelcomePage
const makeSelectWelcomePage = () => createSelector(
  selectWelcomePageDomain(),
  (substate) => substate
);

// Other specific selectors


export default selectWelcomePageDomain;
export {
  makeSelectWelcomePage,
};
