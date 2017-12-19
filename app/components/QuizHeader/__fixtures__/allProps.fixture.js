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
    summaryRoute: '/reviews',
    percentComplete: 33,
    percentCorrect: 10,
    correctCount: 10,
    remainingCount: 20,
  },
};
