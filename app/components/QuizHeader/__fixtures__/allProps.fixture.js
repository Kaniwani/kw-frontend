import QuizHeader from "components/QuizHeader";

export default {
  url: "/",
  component: QuizHeader,
  props: {
    summaryRoute: "/reviews",
    percentComplete: 33,
    percentCorrect: 10,
    correctCount: 10,
    remainingCount: 20,
    bgColor: "tomato",
  },
};
