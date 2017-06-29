import { createSelector } from 'reselect';

const selectHomePageDomain = (state) => state.homePage;

const makeSelectHomePage = () => createSelector(
  selectHomePageDomain,
  (substate) => substate
);

export default selectHomePageDomain;
export {
  makeSelectHomePage,
};
