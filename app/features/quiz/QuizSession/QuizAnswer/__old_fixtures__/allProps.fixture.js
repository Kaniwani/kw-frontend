import QuizAnswer from 'components/QuizAnswer';

export default {
  component: QuizAnswer,
  withCosmosXRay: false,
  props: {
    ...QuizAnswer.defaultProps,
  },
};
