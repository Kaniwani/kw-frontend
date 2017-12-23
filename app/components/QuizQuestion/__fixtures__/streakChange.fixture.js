import QuizQuestion from "components/QuizQuestion";

export default {
  component: QuizQuestion,
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
