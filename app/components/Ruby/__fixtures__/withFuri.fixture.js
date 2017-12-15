import Ruby from "components/Ruby";

export default {
  component: Ruby,
  props: {
    ...Ruby.defaultProps,
    character: "感慨深い",
    reading: "かんがいぶかい",
    furi: "0:かん;1:がい;2:ぶか",
  },
};
