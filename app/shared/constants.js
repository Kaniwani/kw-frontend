const DEV_DOMAIN = 'https://staging.kaniwani.com';
const PROD_DOMAIN = 'https://staging.kaniwani.com';
const BASE_URL = process.env.NODE_ENV !== 'production' ? DEV_DOMAIN : PROD_DOMAIN;

export const KW_API_BASE = `${BASE_URL}/api/v1`;

export const SESSION_EXPIRY_MINUTES = 30;

export const DATE_FORMAT = 'MMM Do YYYY';
export const TIME_FORMAT = 'hh:mma';
export const DATE_TIME_FORMAT = `${DATE_FORMAT}[,] ${TIME_FORMAT}`;

export const MAX_NOTES_LENGTH = 500;

export const WK_SRS_RANKS = {
  ONE: 'APPRENTICE',
  TWO: 'GURU',
  THREE: 'MASTER',
  FOUR: 'ENLIGHTENED',
  FIVE: 'BURNED',
};

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
  'Noun',
  'Proper noun',
  'Godan verb',
  'Suru verb',
  'Ichidan verb',
  'Transitive verb',
  'Intransitive verb',
  'Adjective',
  'No adjective',
  'Na adjective',
  'I adjective',
  // These due to WK vs Jisho nomenclature?
  'No-adjective',
  'Na-adjective',
  'I-adjective',
  'Pre-noun adjectival',
  'Adverb',
  'Numeral',
  'Expression',
  'Prefix',
  'Suffix',
  'Pronoun',
  'Counter',
  'Interjection',
  'Conjunction',
  // THESE ARE FROM jisho2json entries
  // TODO: Will have to sanitise during import
  // FIXME: replace "Godan verb with x ending" to just "Godan verb"
  // FIXME: replace "Noun - used as a prefix/suffix" to just "Prefix" & "Suffix"
  // FIXME: replace "Noun or verb acting prenominally" with "Prenominal"
  // FIXME: Titlecase "intransitive verb"
  'Adverb taking the \'to\' particle',
  'Noun - used as a suffix',
  'intransitive verb',
  'Kuru verb - special class',
  'Suru verb - irregular',
  'Full name',
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

export const KEYCODES = {
  SPACE: 32,
  ENTER: 13,
};
