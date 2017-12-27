import { VocabSynonym } from "common/components/VocabSynonym/VocabSynonym";

export default {
  component: VocabSynonym,
  withCosmosXRay: false,
  props: {
    ...VocabSynonym.defaultProps,
    word: "無駄",
    furi: "0:む;1:だ",
    primaryReading: "むだ",
    secondaryReadings: ["ちかじか", "ちかごろ", "ちかぢか"],
  },
};
