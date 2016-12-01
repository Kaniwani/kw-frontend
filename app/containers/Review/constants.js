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
export const SET_NEW_CURRENT = 'kw/Review/SET_NEW_CURRENT';
export const RETURN_CURRENT_TO_QUEUE = 'kw/Review/RETURN_CURRENT_TO_QUEUE';
export const MOVE_CURRENT_TO_COMPLETED = 'kw/Review/MOVE_CURRENT_TO_COMPLETED';
export const MARK_CORRECT = 'kw/Review/MARK_CORRECT';
export const MARK_INCORRECT = 'kw/Review/MARK_INCORRECT';
export const MARK_IGNORED = 'kw/Review/MARK_IGNORED';
export const CHECK_ANSWER = 'kw/Review/CHECK_ANSWER';
export const PROCESS_ANSWER = 'kw/Review/PROCESS_ANSWER';
export const INCREASE_STREAK = 'kw/Review/INCREASE_STREAK';
export const DECREASE_STREAK = 'kw/Review/DECREASE_STREAK';
export const RESET_STREAK = 'kw/Review/RESET_STREAK';
export const INCREASE_SESSION_CORRECT = 'kw/Review/INCREASE_SESSION_CORRECT';
export const INCREASE_SESSION_INCORRECT = 'kw/Review/INCREASE_SESSION_INCORRECT';
