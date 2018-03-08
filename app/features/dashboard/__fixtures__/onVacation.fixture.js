import { ReviewStatus } from 'features/dashboard/ReviewStatus';
import { addMinutes } from 'date-fns';

export default {
  withCosmosWrapper: false,

  component: ReviewStatus,
  props: {
    reviewsCount: 0,
    vacationDate: addMinutes(new Date(), 30),
    nextReviewDate: false,
    isOnVacation: true,
    loadUser: () => window.alert('loading user details now ready'),
  },
};
