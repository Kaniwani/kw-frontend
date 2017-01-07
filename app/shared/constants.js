
import { RESET_ANSWER } from 'containers/ReviewAnswer/constants';
import { LOAD_USERDATA_SUCCESS } from 'containers/App/constants';
import { LOAD_REVIEWDATA_SUCCESS } from 'containers/ReviewPage/constants';

/**
 * The base url for all KW api requests
 * @type {String}
 */
export const API_BASE_URL = '//localhost:8000/api/v1';

/**
 * Actions that we want redux-storage to trigger a save
 * @type {Array}
 */
export const PERSISTENCE_ACTION_WHITELIST = [
  LOAD_USERDATA_SUCCESS,
  LOAD_REVIEWDATA_SUCCESS,
  RESET_ANSWER,
];

/**
 * State keys that we want redux-storage to persist
 * @type {Array}
 */
export const PERSISTENCE_STATE_WHITELIST = [
  ['global', 'user'],
  'review',
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
export const DATE_IN_WORDS = 'dddd D MMMM YYYY';

/**
 * Maps srs rank levels to english descriptors
 * @type {Object}
 * @example
 * SRS_RANKS['ONE']
 * // => 'APPRENTICE'
 */
export const SRS_RANKS = {
  ONE: 'APPRENTICE',
  TWO: 'GURU',
  THREE: 'MASTER',
  FOUR: 'ENLIGHTENED',
  FIVE: 'BURNED',
};

/**
 * Maps english names of keys to event.which keycodes { P_LOWERCASE: 80 }
 * @type {Object}
 * @example
 * KEYCODES.ENTER
 * // => 13
 */
export const KEYCODES = {
  P_LOWERCASE: 80,
  P_UPPERCASE: 112,
  K_LOWERCASE: 75,
  K_UPPERCASE: 107,
  F_LOWERCASE: 70,
  F_UPPERCASE: 102,
  S_LOWERCASE: 83,
  S_UPPERCASE: 115,
  I_LOWERCASE: 73,
  I_UPPERCASE: 105,
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
