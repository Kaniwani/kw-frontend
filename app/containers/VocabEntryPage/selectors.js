import { createSelector } from 'reselect';
import { denormalizeReview } from 'shared/schemas';
import omit from 'lodash/omit';
import { selectSettings, selectEntities } from 'containers/App/selectors';

const selectReviewById = (state, { id, match: { params: { id: routeId } } }) => state.global.entities.reviews[id || routeId];

const flattenReview = (review) => {
  const { vocabulary: { meanings, readings } } = review;
  return {
    ...omit(review, ['vocabulary']),
    meanings,
    readings,
  };
};

const selectReview = createSelector(
  [selectEntities, selectReviewById],
  (entities, review) => review && flattenReview(denormalizeReview(review, entities))
);

export {
  selectSettings,
  selectReview,
};
