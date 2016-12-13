/*
 * ReviewConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REVIEWDATA = 'kw/ReviewPage/LOAD_REVIEWDATA';
export const LOAD_REVIEWDATA_SUCCESS = 'kw/ReviewPage/LOAD_REVIEWDATA_SUCCESS';
export const LOAD_REVIEWDATA_ERROR = 'kw/ReviewPage/LOAD_REVIEWDATA_ERROR';
export const RECORD_ANSWER = 'kw/ReviewPage/RECORD_ANSWER';
export const RECORD_ANSWER_SUCCESS = 'kw/ReviewPage/RECORD_ANSWER_SUCCESS';
export const RECORD_ANSWER_FAILURE = 'kw/ReviewPage/RECORD_ANSWER_FAILURE';
export const SET_NEW_CURRENT = 'kw/ReviewPage/SET_NEW_CURRENT';
export const RETURN_CURRENT_TO_QUEUE = 'kw/ReviewPage/RETURN_CURRENT_TO_QUEUE';
export const COPY_CURRENT_TO_COMPLETED = 'kw/ReviewPage/COPY_CURRENT_TO_COMPLETED';
export const INCREASE_CURRENT_STREAK = 'kw/ReviewPage/INCREASE_CURRENT_STREAK';
export const DECREASE_CURRENT_STREAK = 'kw/ReviewPage/DECREASE_CURRENT_STREAK';
export const RESET_CURRENT_STREAK = 'kw/ReviewPage/RESET_CURRENT_STREAK';
export const INCREASE_SESSION_CORRECT = 'kw/ReviewPage/INCREASE_SESSION_CORRECT';
export const INCREASE_SESSION_INCORRECT = 'kw/ReviewPage/INCREASE_SESSION_INCORRECT';
