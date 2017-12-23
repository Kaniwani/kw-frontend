import SearchBar from 'components/SearchBar';
SearchBar.displayName = 'SearchBar'; // otherwise "redux-form" in cosmos
export default {
  component: SearchBar,
  reduxState: {},
  props: {
    ...SearchBar.defaultProps,
  },
};
