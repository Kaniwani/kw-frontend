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

export const LOAD_REVIEWDATA = 'kw/Review/LOAD_REVIEWDATA';
export const LOAD_REVIEWDATA_SUCCESS = 'kw/Review/LOAD_REVIEWDATA_SUCCESS';
export const LOAD_REVIEWDATA_ERROR = 'kw/Review/LOAD_REVIEWDATA_ERROR';
export const RECORD_ANSWER = 'kw/Review/RECORD_ANSWER';
export const RECORD_ANSWER_SUCCESS = 'kw/Review/RECORD_ANSWER_SUCCESS';
export const RECORD_ANSWER_FAILURE = 'kw/Review/RECORD_ANSWER_FAILURE';
export const SET_NEW_CURRENT = 'kw/Review/SET_NEW_CURRENT';
export const RETURN_CURRENT_TO_QUEUE = 'kw/Review/RETURN_CURRENT_TO_QUEUE';
export const COPY_CURRENT_TO_COMPLETED = 'kw/Review/COPY_CURRENT_TO_COMPLETED';
export const INCREASE_CURRENT_STREAK = 'kw/Review/INCREASE_CURRENT_STREAK';
export const DECREASE_CURRENT_STREAK = 'kw/Review/DECREASE_CURRENT_STREAK';
export const RESET_CURRENT_STREAK = 'kw/Review/RESET_CURRENT_STREAK';
export const INCREASE_SESSION_CORRECT = 'kw/Review/INCREASE_SESSION_CORRECT';
export const INCREASE_SESSION_INCORRECT = 'kw/Review/INCREASE_SESSION_INCORRECT';
export const SHOW_VOCAB_INFO = 'kw/Review/SHOW_VOCAB_INFO';
export const HIDE_VOCAB_INFO = 'kw/Review/HIDE_VOCAB_INFO';
