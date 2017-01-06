/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_USERDATA = 'kw/App/LOAD_USERDATA';
export const LOAD_USERDATA_SUCCESS = 'kw/App/LOAD_USERDATA_SUCCESS';
export const LOAD_USERDATA_ERROR = 'kw/App/LOAD_USERDATA_ERROR';
export const RESET_USERDATA_REVIEWCOUNT = 'kw/App/RESET_USERDATA_REVIEWCOUNT';
