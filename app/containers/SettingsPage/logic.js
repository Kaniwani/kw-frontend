import { createLogic } from 'redux-logic';

// Individual exports for testing
export const defaultLogic = createLogic({
  type: 'nothung',
  process({ getState, action: { payload, meta } }) { // eslint-disable-line no-unused-vars
    if (meta) console.log('Extra info passed in action: ', meta); // eslint-disable-line no-console
    return new Promise((resolve) => setTimeout(() => resolve(payload), 500));
  },
});

export default [
  defaultLogic,
];
