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
  ROTATE_CURRENT_REVIEW,
} from './constants';

/**
 * Load the reviewData, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REVIEWDATA
 */
export function loadReviewData() {
  return {
    type: LOAD_REVIEWDATA,
  };
}

/**
 * Dispatched when the reviews are loaded by the request saga
 *
 * @param  {object} reviews The review data
 *
 * @return {object} An action object with a type of LOAD_REVIEWDATA_SUCCESS passing the reviews
 */
export function reviewDataLoaded(reviews) {
  return {
    type: LOAD_REVIEWDATA_SUCCESS,
    reviews,
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
    error,
  };
}

/**
 * Dispatched when rotating in next vocab question
 *
 * @param  {object} reviewData The reviews data
 * @param  {object} review The new review item
 *
 * @return {object} An action object with a type of ROTATE_CURRENT_REVIEW passing the new review item, and the updated reviewData list
 */
export function rotateCurrentReview() {
  return {
    type: ROTATE_CURRENT_REVIEW,
  };
}
