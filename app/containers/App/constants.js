import actionTypeCreator, { SYNC, ASYNC } from 'redux-action-types-creator';

const actionType = actionTypeCreator('KW');

const types = actionType({
  GLOBAL: {
    UPDATE: SYNC,
  },
  SRS: ASYNC,
  USER: {
    LOAD: ASYNC,
  },
  REVIEWS: {
    LOAD: ASYNC,
  },
});

export default types;
