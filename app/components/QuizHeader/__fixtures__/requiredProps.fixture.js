import QuizHeader from 'components/QuizHeader';

export default {
  withCosmosWrapper: {
    style: {
      backgroundColor: 'rebeccaPurple',
    },
  },
  url: '/',
  component: QuizHeader,
  props: {
    summaryRoute: "/lessons",
  },
};
