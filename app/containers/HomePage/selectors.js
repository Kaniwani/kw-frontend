/**
 * Homepage selectors
 */

// import { createSelector } from 'reselect';

const selectHomeDomain = () => (state) => state.get('home');

export default selectHomeDomain;
