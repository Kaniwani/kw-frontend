import QuizHeader from "old/features/QuizHeader";

export default {
  url: "/",
  component: QuizHeader,
  withCosmosXRay: false,
  props: {
    summaryRoute: "/lessons",
  },
};
