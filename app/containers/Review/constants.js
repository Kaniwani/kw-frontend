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

export const LOAD_REVIEWDATA = 'kaniwani/Review/LOAD_REVIEWDATA';
export const LOAD_REVIEWDATA_SUCCESS = 'kaniwani/Review/LOAD_REVIEWDATA_SUCCESS';
export const LOAD_REVIEWDATA_ERROR = 'kaniwani/Review/LOAD_REVIEWDATA_ERROR';
export const ROTATE_CURRENT_REVIEW = 'kaniwani/Review/ROTATE_CURRENT_REVIEW';
export const INCREASE_COMPLETED_COUNT = 'kaniwani/Review/INCREASE_COMPLETED_COUNT';
