import { SearchResults } from "features/search/SearchResults";

export default {
  component: SearchResults,
  withCosmosXRay: false,
  url: '/',
  props: {
    isSearching: true,
  },
};
