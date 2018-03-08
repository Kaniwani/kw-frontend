import { UpcomingReviewsChart } from 'features/dashboard/UpcomingReviewsChart';

export default {
  withCosmosWrapper: {
    style: {
      backgroundColor: 'white',
    },
  },
  component: UpcomingReviewsChart,

  props: {
    data: [
      {
        day: '',
        hour: '11pm',
        value: 24,
      },
      {
        day: 'Friday',
        hour: '12am',
        value: 2,
      },
      {
        day: '',
        hour: '6pm',
        value: 224,
      },
    ],
  },
};
