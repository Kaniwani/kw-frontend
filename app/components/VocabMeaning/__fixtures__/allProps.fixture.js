import VocabMeaning from "components/VocabMeaning";

export default {
  component: VocabMeaning,
  props: {
    ...VocabMeaning.defaultProps,
    primaryMeaning: "no good",
    secondaryMeanings: ["no, no good for me", "another meaning", "yet another meaning"],
  },
};
