import QuizHeader from "old/features/QuizHeader";

export default {
  url: "/",
  component: QuizHeader,
  withCosmosXRay: false,
  props: {
    summaryRoute: "/reviews",
    percentComplete: 33,
    percentCorrect: 10,
    correctCount: 10,
    remainingCount: 20,
    bgColor: "tomato",
  },
};