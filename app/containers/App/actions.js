/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_USERDATA,
  LOAD_USERDATA_SUCCESS,
  LOAD_USERDATA_ERROR,
} from './constants';

/**
 * Load the userData, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_USERDATA
 */
export function loadUserData() {
  return {
    type: LOAD_USERDATA,
  };
}

/**
 * Dispatched when the userData are loaded by the request saga
 *
 * @param  {object} userData The userData data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_USERDATA_SUCCESS passing the userData
 */
export function userDataLoaded(userData) {
  return {
    type: LOAD_USERDATA_SUCCESS,
    userData,
  };
}

/**
 * Dispatched when loading the userData fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_USERDATA_ERROR passing the error
 */
export function userDataLoadingError(error) {
  return {
    type: LOAD_USERDATA_ERROR,
    error,
  };
}
