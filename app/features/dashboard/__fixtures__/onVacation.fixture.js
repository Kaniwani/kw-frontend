import { ReviewStatus } from 'features/dashboard/ReviewStatus';
import { addMinutes } from 'date-fns';

export default {
  withCosmosWrapper: false,
  withCosmosXRay: false,
  component: ReviewStatus,
  props: {
    reviewsCount: 0,
    vacationDate: addMinutes(new Date(), 30),
    nextReviewDate: false,
  },
};
