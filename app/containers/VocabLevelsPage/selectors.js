import { createSelector } from 'reselect';
import toArray from 'lodash/toArray';

const selectLevels = (state) => toArray(state.global.entities.levels);
const selectUserLevel = (state) => state.global.user.currentLevel;
const selectLevel = (state, { level }) => state.global.entities.levels[level];
const makeSelectLevel = () => createSelector(
  selectLevel,
  (level) => level,
);

export {
  selectUserLevel,
  selectLevels,
  makeSelectLevel,
};
