/**
 * Format string for use with 'date-fns/format'
 * @type {String}
 * @example
 * import format from 'date-fns/format'
 * format(new Date(2014, 11, 2), DATE_IN_WORDS)
 * // => 12:00am, Nov 2nd 2014
 */
export const DATE_IN_WORDS = 'hh:mma[,] MMM Do YYYY';

export const DETAIL_LEVELS = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
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
  'Uncommon',
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
  'Pre-noun adjectival',
  'Adverb',
  'Numeral',
  'Expression',
  'Prefix',
  'Pronoun',
  'Counter',
  'Interjection',
  'Conjunction',
  'No-adjective',
  'Na-adjective',
  // THESE ARE FROM jisho2json scrape
  // TODO: Will have to sanitise during import
  // FIXME: replace "Godan verb with x ending" to just "Godan verb"
  // FIXME: replace "Noun - used as a prefix/suffix" to just "Prefix" & "Suffix"
  // FIXME: replace "Noun or verb acting prenominally" with "Prenominal"
  // FIXME: Titlecase "intransitive verb"
  'Adverb taking the \'to\' particle',
  'Noun - used as a suffix',
  'intransitive verb',
  'I-adjective',
  'Kuru verb - special class',
  'Full name',
  'Suru verb - irregular',
  'Noun - used as a prefix',
  'Noun - used as a suffix',
  'Adverbial noun',
  'Temporal noun',
  'Place',
  'Auxiliary verb',
  'Noun or verb acting prenominally',
  'Taru-adjective',
  'Godan verb with ru ending',
  'Godan verb with u ending',
  'Godan verb with ku ending',
  'Godan verb with su ending',
  'Godan verb with mu ending',
  'Godan verb with gu ending',
];

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
