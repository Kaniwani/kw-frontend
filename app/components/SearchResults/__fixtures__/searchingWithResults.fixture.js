import SearchResults from "components/SearchResults";

export default {
  component: SearchResults,
  url: '/',
  props: {
    isSearching: true,
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
