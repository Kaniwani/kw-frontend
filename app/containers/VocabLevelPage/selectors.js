import { createSelector } from 'reselect';
import { denormalizeReviews } from 'shared/schemas';
import pick from 'lodash/pick';

import { selectEntities } from 'containers/App/selectors';
const selectLevel = (state, { match: { params: { id } } }) => state.global.entities.levels[id];

const makeSelectLevelReviews = () => createSelector(
  [selectEntities, selectLevel],
  (entities, level) => level && denormalizeReviews(Object.values(pick(entities.reviews, level.reviews)), entities)
);

export {
  makeSelectLevelReviews,
};
