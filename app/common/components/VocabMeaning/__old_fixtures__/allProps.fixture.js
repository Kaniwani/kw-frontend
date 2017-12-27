import VocabMeaning from "old/features/VocabMeaning";

export default {
  component: VocabMeaning,
  withCosmosXRay: false,
  props: {
    ...VocabMeaning.defaultProps,
    primaryMeaning: "no good",
    secondaryMeanings: ["no, no good for me", "another meaning", "yet another meaning"],
  },
};
