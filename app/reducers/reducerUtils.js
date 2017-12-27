import update from "immutability-helper";

export function createReducer(initialState, fnMap) {
  return (state = initialState, { type, payload }) => {
    const handler = fnMap[type];

    return handler ? handler(state, payload) : state;
  };
}

export function reduceReducers(...reducers) {
  return (previous, current) => reducers.reduce((p, r) => r(p, current), previous);
}

export function createConditionalSliceReducer(sliceName, fnMap) {
  // Create a reducer that knows how to handle one slice of state, with these action types
  const sliceReducer = createReducer({}, fnMap);

  // Create a new wrapping reducer
  return (state, action) => {
    // Check to see if this slice reducer knows how to handle this action
    if (fnMap[action.type]) {
      // If it does, pass the slice to the slice reducer, and update the slice
      return {
        ...state,
        [sliceName]: sliceReducer(state[sliceName], action),
      };
    }

    // Otherwise, return the existing state unchanged
    return state;
  };
}

/*
 * If we store these in uiReducer we'll create a circular dependency
 * due to slice reducers importing these
 * and then the slice reducers being re-imported to uiReducer
*/

export const initialUiState = {
  isLoading: false,
  lastLoad: false,
  error: false,
};

export const updateUiLoadRequest = (state) =>
  update(state, { $merge: { isLoading: true } });
export const updateUiLoadSuccess = (state) =>
  update(state, { $merge: { lastLoad: new Date(), isLoading: false, error: false } });
export const updateUiLoadFailure = (state, action) =>
  update(state, { $merge: { isLoading: false, error: action.payload } });
