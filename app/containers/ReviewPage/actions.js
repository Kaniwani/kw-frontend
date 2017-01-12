/*
 * Review Actions
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
  LOAD_REVIEWDATA,
  LOAD_REVIEWDATA_SUCCESS,
  LOAD_REVIEWDATA_ERROR,
} from './constants';

/**
 * Load the reviewData, this action starts the request saga
 * @param {boolean} [indicate=true] - false to prevent showing loading placeholder, for background loading
 * @return {object} An action object with a type of LOAD_REVIEWDATA
 */
export function loadReviewData(indicate = true) {
  return {
    type: LOAD_REVIEWDATA,
    showIndicator: indicate,
  };
}

/**
 * Dispatched when the review data is loaded by the request saga
 *
 * @param  {object} payload - payload containing {data, title, and message}
 * @return {object} An action object with a type of LOAD_REVIEWDATA_SUCCESS passing the review data
 */
export function reviewDataLoaded(data) {
  return {
    type: LOAD_REVIEWDATA_SUCCESS,
    payload: data,
  };
}

/**
 * Dispatched when loading the reviewData fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_REVIEWDATA_ERROR passing the error
 */
export function reviewDataLoadingError(error) {
  return {
    type: LOAD_REVIEWDATA_ERROR,
    payload: error,
  };
}
