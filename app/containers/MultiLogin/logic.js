import { createLogic } from 'redux-logic';
import multiLogin from './actions';

// Individual exports for testing
export const defaultLogic = createLogic({
  type: multiLogin.setActivePanel, // action type logic listens for
  validate({ action }, allow) {
    allow(action);
  },
});

// All logic to be loaded
export default [
  defaultLogic,
];
