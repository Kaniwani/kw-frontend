import { createLogic } from 'redux-logic';
import {
  defaultLoad,
  defaultLoadCancel,
  defaultLoadSuccess,
  defaultLoadFailure,
} from './actions';

// Individual exports for testing
export const defaultLogic = createLogic({
  type: defaultLoad, // action type logic listens for
  cancelType: defaultLoadCancel, // actions to cancel on
  // latest: true, // use response for latest request only
  /* other less used options: debounce, throttle */

  /*
    optionally implement either of these intercepting
    life-cycle hooks (validate or transform). The action
    passed through allow/reject/next is passed to next
    middleware or the reducers.
   */
  // validate({ getState, action }, allow, reject) {
  //   /* allow causes process hook to run, while
  //      reject prevents process hook from running
  //      In either case you can pass modified action
  //      or undefined to silence the action */
  //   allow(action); // or reject(action);
  // },
  //
  // transform({ getState, action }, next) {
  //   /* can pass modified action or undefined to silence action */
  //   next(action);
  // },

  processOptions: { // influences what is dispatched
    successType: defaultLoadSuccess, // apply action type/creator for success
    failType: defaultLoadFailure, // apply action type/creator on errors
  },

  process({ getState, action: { payload, meta } }) { // eslint-disable-line no-unused-vars
    if (meta) console.log('Extra info passed in action: ', meta); // eslint-disable-line no-console
    return new Promise((resolve) => setTimeout(() => resolve(payload), 500));
  },

  /* OR using the auto-dispatching return style by omitting dispatch/done
     Omit dispatch & done in signature and just return a value
      - if you return an undefined then no dispatch will occur
      - if you return an object it will be dispatched
      - if you return a promise then dispatch the resolved/rejected action
      - if you return an observable then dispatch next/error actions
      - if you return an error it will be dispatched (wrapped first if action type)
     Then you can write code like the following. See docs for more details.

     process({ getState, action, requestUtil }) {
       // return promise that resolves to the action to dispatch,
       // I am showing how to resolve to the action I want to dispatch,
       // but I also could have enabled the processOptions.successType
       // and just resolved with repos for the same dispatch.
       return API.fetchRepos(action.payload)
         .then(repos => ({ type: FOO_SUCCESS, payload: repos }));
     }
  */

});


/*
   Optional onLogicInit function, implement to run this after load
   It runs once per load by checking if the store is the same as last
  */
// let lastStore; // save reference to last store to only run once
// export function onLogicInit(store) {
//   /* remove the next two lines to rerun on every route change back */
//   if (lastStore === store) { return; } // only running on initial load
//   lastStore = store; // save for load once check
//
//   /* perform any dispatching you need */
//   // store.dispatch({ type: 'FOO' });
// }


// All logic to be loaded
export default [
  defaultLogic,
];
