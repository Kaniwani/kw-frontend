import { createSelector } from 'reselect';
import { denormalizeReviews } from 'shared/schemas';
import pick from 'lodash/pick';

import { selectEntities } from 'containers/App/selectors';
const selectLevel = (state, { match: { params: { level } } }) => state.global.entities.levels[level];

const makeSelectLevelReviews = () => createSelector(
  [selectEntities, selectLevel],
  (entities, level) => level && denormalizeReviews(Object.values(pick(entities.reviews, level.ids)), entities)
);

export {
  makeSelectLevelReviews,
};
