import actionTypeCreator, { ASYNC } from 'redux-action-types-creator';

const actionType = actionTypeCreator('KW/SYNONYMFORM');

const Types = actionType({
  ADD: ASYNC,
  REMOVE: ASYNC,
});

export default Types;
