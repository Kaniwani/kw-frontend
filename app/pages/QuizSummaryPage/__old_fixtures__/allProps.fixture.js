import QuizSummaryPage from 'pages/QuizSummaryPage';
import quizSummary from 'common/data/fixtures/quizSummary';

export default {
  withCosmosXRay: false,
  component: QuizSummaryPage,
  url: '/reviews',
  props: quizSummary,
};
