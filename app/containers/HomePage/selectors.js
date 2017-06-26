import { createSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';

// Direct selector to the homepage state domain
const selectHomePageDomain = () => (state) => state.homepage;

// Other specific selectors
const makeSelectUser = () => createSelector(
  selectGlobal,
  (state) => state.user,
);

export default selectHomePageDomain;
export {
  makeSelectUser,
};
