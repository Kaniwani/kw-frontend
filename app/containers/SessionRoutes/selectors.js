import { createSelector } from 'reselect';
import pick from 'lodash/pick';
import { denormalizeReview, denormalizeReviews } from 'shared/serializers';
import {
  selectEntities,
  selectReviewCount,
  selectLessonCount,
} from 'containers/App/selectors';

import calculatePercentage from 'utils/calculatePercentage';

const selectSessionDomain = (state) => state.session;
const selectQueue = (state) => state.session.queue;
const selectLoading = (state) => state.session.loading;
const selectCompleteCount = createSelector(selectSessionDomain, ({ complete }) => complete.length);
const selectCorrectCount = createSelector(selectSessionDomain, ({ correct }) => correct.length);
const selectCurrentItem = createSelector(
  [selectEntities, selectSessionDomain],
  (entities, { current }) => current && denormalizeReview(entities.reviews[current], entities)
);

const selectTotalCount = (state, { match: { params: { category } } }) =>
  category === 'reviews' ?
    selectReviewCount(state) :
    selectLessonCount(state);

const selectRemainingCount = createSelector(
  [selectSessionDomain, selectTotalCount],
  ({ complete }, total) => Math.max((total - 1) /* 1 = current review */ - complete, 0),
);

const makeSelectCorrectItems = () => createSelector(
  [selectEntities, selectSessionDomain],
  (entities, { correct }) =>
    correct && denormalizeReviews(Object.values(pick(entities.reviews, correct)), entities)
);

const makeSelectIncorrectItems = () => createSelector(
  [selectEntities, selectSessionDomain],
  (entities, { incorrect }) =>
    incorrect && denormalizeReviews(Object.values(pick(entities.reviews, incorrect)), entities)
);

const makeSelectCriticalItems = () => createSelector(
  [selectEntities, selectSessionDomain],
  (entities, { critical }) =>
    critical && denormalizeReviews(Object.values(pick(entities.reviews, critical)), entities)
);

const makeSelectPercentComplete = () => createSelector(
  [selectCorrectCount, selectTotalCount],
  (correct, total) => calculatePercentage(correct, total),
);

const makeSelectPercentCorrect = () => createSelector(
  [selectCorrectCount, selectCompleteCount],
  (correct, complete) => calculatePercentage(correct, complete),
);

export default selectSessionDomain;
export {
  selectLoading,
  selectQueue,
  selectTotalCount,
  selectCompleteCount,
  selectRemainingCount,
  selectCurrentItem,
  makeSelectCorrectItems,
  makeSelectIncorrectItems,
  makeSelectCriticalItems,
  makeSelectPercentCorrect,
  makeSelectPercentComplete,
};
