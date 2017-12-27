import QuizQuestion from "old/features/QuizQuestion";

export default {
  component: QuizQuestion,
  withCosmosXRay: false,
  props: {
    primaryMeaning: "clogs",
    secondaryMeanings: ["funny shoes, wooden clackers"],
    tags: ["common", "n"],
    isFlyoverActive: true,
    streakChange: {
      from: 8,
      to: 4,
    },
  },
};
