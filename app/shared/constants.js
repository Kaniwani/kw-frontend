const DEV_DOMAIN = 'http://localhost:8000';
const PROD_DOMAIN = 'https://kaniwani.com';
const BASE_URL = process.env.NODE_ENV !== 'production' ? DEV_DOMAIN : PROD_DOMAIN;

export const KW_API_BASE = `${BASE_URL}/api/v1`;

export const SESSION_EXPIRY_MINUTES = 30;
/**
 * Format string for use with 'date-fns/format'
 * @type {String}
 * @example
 * import format from 'date-fns/format'
 * format(new Date(2014, 11, 2), DATE_IN_WORDS)
 * // => 12:00am, Nov 2nd 2014
 */
export const DATE_IN_WORDS = 'MMM Do YYYY[,] hh:mma';

export const MAX_NOTES_LENGTH = 500;

export const SRS_RANKS = {
  ZERO: 'UNTRAINED',
  ONE: 'APPRENTICE',
  TWO: 'GURU',
  THREE: 'MASTER',
  FOUR: 'ENLIGHTENED',
  FIVE: 'BURNED',
};

export const SRS_RANGES = {
  ZERO: [0],
  ONE: [1, 2, 3, 4],
  TWO: [5, 6],
  THREE: [7],
  FOUR: [8],
  FIVE: [9],
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
  // THESE ARE FROM jisho2json entries
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
