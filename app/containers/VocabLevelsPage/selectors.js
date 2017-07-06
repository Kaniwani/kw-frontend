import { createSelector } from 'reselect';

const selectLevels = (state) => Object.keys(state.global.entities.levels);
const selectUserLevel = (state) => state.global.user.currentLevel;
const selectLevelById = (state, { id }) => state.global.entities.levels[id];
const makeSelectLevel = () => createSelector(
  selectLevelById,
  (level) => level,
);

export {
  selectUserLevel,
  selectLevels,
  makeSelectLevel,
};
