import types from 'containers/App/constants';
// import { LOAD_LEVELS_SUCCESS } from 'containers/VocabularyPage/constants';
import reviewTypes from 'containers/ReviewSession/constants';

/**
 * Actions that we want redux-storage to trigger a save
 * @type {Array}
 */
export const PERSISTENCE_ACTION_WHITELIST = [
  types.USER.LOAD.SUCCESS,
  types.REVIEWS.LOAD.SUCCESS,
  reviewTypes.ANSWER.RESET,
];

/**
 * State keys that we want redux-storage to persist
 * @type {Array}
 */
export const PERSISTENCE_STATE_WHITELIST = [
  ['global', 'user'],
  ['global', 'reviewCount'],
  ['global', 'reviews'],
  // ['global', 'session'], // TODO: maybe we should store this, in case user connection drops, but clear it if 15 minutes have passed
];


/**
* State keys that we don't want redux-storage to persist
* @type {Array}
*/
export const PERSISTENCE_STATE_BLACKLIST = [
  ['global', 'loading'],
  ['global', 'error'],
  ['review', 'loading'],
  ['review', 'error'],
];

/**
* The maximum amount of minutes passed since last sync allowed
* @type {Number}
*/
export const MINUTES_SINCE_LAST_SYNC_LIMIT = 5;

/**
 * Format string for use with 'date-fns/format'
 * @type {String}
 * @example
 * import format from 'date-fns/format'
 * format(new Date(2014, 6, 2), DATE_IN_WORDS)
 * // => Wednesday 2 July 2014
 */
export const DATE_IN_WORDS = '[at] hh:mm A[, on the] Do [of] MMM[,] YYYY';

/**
 * Maps srs rank levels to english descriptors
 * @type {Object}
 * @example
 * SRS_RANKS['ONE']
 * // => 'APPRENTICE'
 */

export const PANELS = {
  INFO: 'info',
  NOTES: 'notes',
  SETTINGS: 'settings',
  SYNONYM: 'synonym',
  NONE: 'none',
};

export const SRS_RANKS = {
  ONE: 'APPRENTICE',
  TWO: 'GURU',
  THREE: 'MASTER',
  FOUR: 'ENLIGHTENED',
  FIVE: 'BURNED',
};

export const MAX_DETAIL_DEPTH = 3;
export const DETAIL_LEVELS = ['Low', 'Medium', 'High'];
export const ANSWER_TYPES = {
  character: '漢字',
  kana: 'かな',
};
export const TILDE_JA = '〜';
export const TILDE_EN = '~';


/**
 * Maps english names of keys to event.which keycodes { P_LOWERCASE: 80 }
 * @type {Object}
 * @example
 * KEYCODES.ENTER
 * // => 13
 */
export const KEYCODES = {
  F_LOWERCASE: 70,
  K_LOWERCASE: 75,
  N_LOWERCASE: 78,
  P_LOWERCASE: 80,
  S_LOWERCASE: 83,
  I_LOWERCASE: 73,
  BACKSPACE: 8,
  FORWARD_SLASH: 191,
  BACK_SLASH: 220,
  ENTER: 13,
  DELETE: 46,
  TAB: 9,
  ESCAPE: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  PRIME: 222,
  COLON: 186,
  EQUALS: 187,
  COMMA: 188,
  HYPHEN: 189,
  PERIOD: 190,
  BACKTICK: 192,
  BRACKET_LEFT: 219,
  BRACKET_RIGHT: 221,
};
