import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
} from './constants';

// The global initialState of the App
const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return {
        ...state,
        loading: true,
        error: false,
        userData: {
          ...state.userData,
          repositories: false,
        },
      };
    case LOAD_REPOS_SUCCESS:
      return {
        ...state,
        userData: {
          ...state.userData,
          repositories: action.repos,
        },
        loading: false,
        currentUser: action.username,
      };
    case LOAD_REPOS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default appReducer;
