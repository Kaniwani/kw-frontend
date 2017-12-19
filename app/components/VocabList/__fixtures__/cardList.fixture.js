import VocabList, { ITEM_TYPES } from "components/VocabList";
const items = [
  {
    id: 12346,
    word: "無駄",
    furi: "0:む;1:だ",
    primaryMeaning: "no good",
    primaryReading: "むだ",
    secondaryMeanings: ["no, no good for me"],
    correct: 2,
    incorrect: 3,
  },
  {
    id: 12345,
    word: "承る",
    furi: "",
    primaryMeaning: "to consent",
    primaryReading: "うけたまわる",
    secondaryMeanings: ["to hear", "to be informed", "to listen to"],
    correct: 0,
    incorrect: 0,
  },
];

export default {
  component: VocabList,
  url: '/',
  props: {
    itemType: ITEM_TYPES.CARD,
    items,
  },
};
