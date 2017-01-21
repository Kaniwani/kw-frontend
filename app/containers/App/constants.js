import actionTypeCreator, { SYNC, ASYNC } from 'redux-action-types-creator';

const actionType = actionTypeCreator('KW');

const types = actionType({
  GLOBAL: {
    UPDATE: SYNC,
  },
  AUTH: {
    LOGIN: ASYNC,
  },
  USER: {
    SRS: ASYNC,
    LOAD: ASYNC,
  },
  REVIEWS: {
    LOAD: ASYNC,
  },
});

export default types;
