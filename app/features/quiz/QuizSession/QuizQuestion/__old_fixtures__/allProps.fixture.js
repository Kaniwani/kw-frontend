import QuizQuestion from "old/features/QuizQuestion";

export default {
  component: QuizQuestion,
  withCosmosXRay: false,
  props: {
    ...QuizQuestion.defaultProps,
    primaryMeaning: "clogs",
    secondaryMeanings: ["funny shoes, wooden clackers"],
    tags: ["common", "n"],
  },
};
