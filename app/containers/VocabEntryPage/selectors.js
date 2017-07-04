import { createSelector } from 'reselect';
import { denormalizeReview } from 'shared/schemas';
import { selectSettings, selectEntities } from 'containers/App/selectors';

const selectReview = (state, { match: { params: { id } } }) => state.global.entities.reviews[id];

const makeSelectReview = () => createSelector(
  [selectEntities, selectReview],
  (entities, review) => review && denormalizeReview(review, entities)
);

export {
  selectSettings,
  makeSelectReview,
};
