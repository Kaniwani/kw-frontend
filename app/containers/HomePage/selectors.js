/**
 * Homepage selectors
 */

// import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

export {
  selectHome,
};
