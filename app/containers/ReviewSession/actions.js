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
  SET_NEW_CURRENT,
  RETURN_CURRENT_TO_QUEUE,
  COPY_CURRENT_TO_COMPLETED,
  INCREASE_SESSION_CORRECT,
  INCREASE_SESSION_INCORRECT,
  INCREASE_CURRENT_STREAK,
  DECREASE_CURRENT_STREAK,
  RESET_CURRENT_STREAK,
} from './constants';

/**
 * Dispatched when rotating in next vocab question
 *
 * @return {object} An action object with a type of SET_NEW_CURRENT
 */
export function setNewCurrent() {
  return {
    type: SET_NEW_CURRENT,
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
 * Inserts current review back into the reviews queue at a random insertion point
 * @return {object} An action object with a type of RETURN_CURRENT_TO_QUEUE
 */
export function copyCurrentToCompleted() {
  return {
    type: COPY_CURRENT_TO_COMPLETED,
  };
}


/**
 * Increases the session streak count by 1 on the current review item
 * @return {object} An action object with a type of INCREASE_CURRENT_STREAK
 */
export function increaseCurrentStreak() {
  return {
    type: INCREASE_CURRENT_STREAK,
  };
}

/**
 * Decreases the session streak count by 1 on the current review item
 * @return {object} An action object with a type of DECREASE_CURRENT_STREAK
 */
export function decreaseCurrentStreak() {
  return {
    type: DECREASE_CURRENT_STREAK,
  };
}

/**
 * Resets the session streak count on the current review item to the historical streak count
 * @return {object} An action object with a type of RESET_CURRENT_STREAK
 */
export function resetCurrentStreak() {
  return {
    type: RESET_CURRENT_STREAK,
  };
}

/**
 * Increases the session total correct count by 1
 * @return {object} An action object with a type of INCREASE_SESSION_CORRECT
 */
export function increaseSessionCorrect() {
  return {
    type: INCREASE_SESSION_CORRECT,
  };
}

/**
 * Increases the session total incorrect count by 1
 * @return {object} An action object with a type of INCREASE_SESSION_INCORRECT
 */
export function increaseSessionIncorrect() {
  return {
    type: INCREASE_SESSION_INCORRECT,
  };
}
