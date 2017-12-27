import KanjiStroke from "common/components/KanjiStroke/KanjiStroke";

export default {
  component: KanjiStroke,
  withCosmosXRay: false,
  props: {
    word: "混乱する",
    ...KanjiStroke.defaultProps,
  },
};
