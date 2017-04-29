/**
 * Format string for use with 'date-fns/format'
 * @type {String}
 * @example
 * import format from 'date-fns/format'
 * format(new Date(2014, 11, 2), DATE_IN_WORDS)
 * // => 12:00am, Nov 2nd 2014
 */
export const DATE_IN_WORDS = 'hh:mma[,] MMM Do YYYY';

export const MINUTES_SINCE_LAST_SYNC_LIMIT = 5;

// FIXME: could just be an array
export const PANELS = {
  INFO: 'info',
  NOTES: 'notes',
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

export const PARTS_OF_SPEECH = [
  'JLPT N1',
  'JLPT N2',
  'JLPT N3',
  'JLPT N4',
  'JLPT N5',
  'Common',
  'Intransitive verb',
  'Godan verb',
  'Noun',
  'Suru verb',
  'Transitive verb',
  'Ichidan verb',
  'No adjective',
  'Na adjective',
  'Suffix',
  'I adjective',
  'Proper noun',
  'Adjective',
  'Adverb',
  'Numeral',
  'Expression',
  'Prefix',
  'Pronoun',
  'Counter',
  'Interjection',
  'Conjunction',
];

export const MAX_DETAIL_DEPTH = 3;
export const DETAIL_LEVELS = ['Low', 'Medium', 'High'];

export const ANSWER_TYPES = {
  kanji: '漢字',
  kana: 'かな',
};

export const TILDE_JA = '〜';
export const TILDE_EN = '~';


/**
 * Maps names of keys to event.which keycodes { P_LOWERCASE: 80 }
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
