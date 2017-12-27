import { SearchResults } from "features/search/SearchResults";

export default {
  component: SearchResults,
  withCosmosXRay: false,
  url: '/',
  props: {
    isSearchComplete: true,
    items: [
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
    ],
  },
};
