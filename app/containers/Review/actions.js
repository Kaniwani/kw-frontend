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
  RETURN_CURRENT_TO_QUEUE,
  MARK_CORRECT,
  MARK_INCORRECT,
  MARK_IGNORED,
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
 * Dispatched when the review data is loaded by the request saga
 *
 * @param  {object} reviewData The review data
 *
 * @return {object} An action object with a type of LOAD_REVIEWDATA_SUCCESS passing the review data
 */
export function reviewDataLoaded(reviewData) {
  return {
    type: LOAD_REVIEWDATA_SUCCESS,
    reviewData,
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
 * @return {object} An action object with a type of ROTATE_CURRENT_REVIEW
 */
export function rotateCurrentReview() {
  return {
    type: ROTATE_CURRENT_REVIEW,
  };
}

/**
 * Inserts current review back into the reviews queue at a random insertion point
 * @return {object} An action object with a type of RETURN_CURRENT_TO_QUEUE
 */
export function returnCurrentToQueue() {
  return {
    type: RETURN_CURRENT_TO_QUEUE,
  };
}

/**
 * Marks current review item as correct and updates progress
 * @return {object} An action object with a type of MARK_CORRECT
 */
export function markCorrect() {
  return {
    type: MARK_CORRECT,
  };
}

/**
 * Marks current review item as incorrect and updates progress
 * @param  {object} review Review item
 * @return {object} An action object with a type of MARK_INCORRECT
 */
export function markIncorrect() {
  return {
    type: MARK_INCORRECT,
  };
}

/**
 * Marks current review item as ignored and updates progress
 * @param  {object} review Review item
 * @return {object} An action object with a type of MARK_IGNORED
 */
export function markIgnored() {
  return {
    type: MARK_IGNORED,
  };
}
