import { createActions } from 'redux-actions';

const ASYNC = {
  REQUEST: undefined, // undefined should result in identity fn(payload) => { type: "TYPE", payload }
  SUCCESS: undefined,
  FAILURE: undefined, // if payload is an error, redux-actions will add { error: true }
  CANCEL: undefined,
};

export const { levels } = createActions({
  LEVELS: {
    LOAD: ASYNC,
    LOCKLEVEL: ASYNC,
    UNLOCKLEVEL: ASYNC,
  },
});

export default levels;
