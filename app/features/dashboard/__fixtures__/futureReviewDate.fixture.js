import { ReviewStatus } from 'features/dashboard/ReviewStatus';
import { addMinutes } from 'date-fns';

export default {
  withCosmosWrapper: false,

  component: ReviewStatus,
  props: {
    reviewsCount: 0,
    vacationDate: false,
    nextReviewDate: addMinutes(new Date(), 1),
    isOnVacation: false,
    loadUser: () => window.alert('loading user details now ready'),
  },
};
