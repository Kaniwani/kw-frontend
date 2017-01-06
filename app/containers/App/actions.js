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
  RESET_USERDATA_REVIEWCOUNT,
} from './constants';

/**
 * Load the userData, this action starts the request saga
 * @param {boolean} [indicate=true] - false to prevent showing loading placeholder, for background loading
 * @return {object} An action object with a type of LOAD_USERDATA
 */
export function loadUserData(indicate = true) {
  return {
    type: LOAD_USERDATA,
    showIndicator: indicate,
  };
}

/**
 * Dispatched when the userData are loaded by the request saga
 * @param  {object} userData The userData data
 * @param  {string} username The current username
 * @return {object}      An action object with a type of LOAD_USERDATA_SUCCESS passing the userData
 */
export function userDataLoaded(data) {
  return {
    type: LOAD_USERDATA_SUCCESS,
    payload: data,
  };
}

/**
 * Dispatched when loading the userData fails
 * @param  {object} error The error
 * @return {object}       An action object with a type of LOAD_USERDATA_ERROR passing the error
 */
export function userDataLoadingError(error) {
  return {
    type: LOAD_USERDATA_ERROR,
    error,
  };
}

/**
 * Dispatched when loading the summary page due to *review queue completion*
 * By resetting the reviewCount in user data, this will force a sync to check for new user data
 * @return {object}       An action object with a type of RESET_USERDATA_REVIEWCOUNT
 */
export function resetUserDataReviewCount() {
  return {
    type: RESET_USERDATA_REVIEWCOUNT,
  };
}
