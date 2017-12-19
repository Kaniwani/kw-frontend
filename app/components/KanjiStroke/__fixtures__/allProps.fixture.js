import KanjiStroke from "components/KanjiStroke";

export default {
  component: KanjiStroke,
  props: {
    word: "混乱する",
    ...KanjiStroke.defaultProps,
  },
};
