import { createSelector } from 'reselect';

// Direct selector to the protectedRoutes state domain
const selectProtectedRoutesDomain = () => (state) => state.protectedRoutes;

// Main selector used by ProtectedRoutes
const makeSelectProtectedRoutes = () => createSelector(
  selectProtectedRoutesDomain(),
  (substate) => substate
);

// Other specific selectors


export default selectProtectedRoutesDomain;
export {
  makeSelectProtectedRoutes,
};
