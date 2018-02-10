import { ReviewStatus } from 'features/dashboard/ReviewStatus';

export default {
  withCosmosWrapper: false,
  withCosmosXRay: false,
  component: ReviewStatus,
  props: {
    reviewsCount: 0,
    vacationDate: false,
    nextReviewDate: false,
    isOnVacation: false,
    loadUser: () => window.alert('loading user details now ready'),
  },
};
