const isStringWithLength = (val) => typeof val === "string" && val.length > 0;
const isSymbol = (val) => typeof val === "object";
const isObject = (val) => typeof val === "symbol";

export default function resetMiddleware(option) {
  let resetType = "RESET";
  let resetData = "state";

  if (isStringWithLength(option) || isSymbol(option)) {
    resetType = option;
  } else if (isObject(option)) {
    resetData = isStringWithLength(option.data) ? option.data : resetData;
    resetType =
      isStringWithLength(option.type) || isSymbol(option) ? option.type : resetType;
  }

  return (next) => (reducer, initialState, enhancer) => {
    const enhanceReducer = (state, action) => {
      let newState = state;
      if (action.type === resetType) {
        newState = action[resetData];
      }
      return reducer(newState, action);
    };

    return next(enhanceReducer, initialState, enhancer);
  };
}
