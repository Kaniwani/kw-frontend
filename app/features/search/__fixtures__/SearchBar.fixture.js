import { SearchBar } from 'features/search/SearchBar';

SearchBar.displayName = 'SearchBar'; // otherwise "redux-form" in cosmos

export default {
  component: SearchBar,
  withCosmosXRay: false,
  reduxState: {},
  props: {
    ...SearchBar.defaultProps,
  },
};
