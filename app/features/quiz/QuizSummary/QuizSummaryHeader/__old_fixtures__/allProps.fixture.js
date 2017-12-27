import QuizSummaryHeader from "old/features/QuizSummaryHeader";

export default {
  component: QuizSummaryHeader,
  withCosmosXRay: false,
  url: "/",
  props: {
    ...QuizSummaryHeader.defaultProps,
  },
};
