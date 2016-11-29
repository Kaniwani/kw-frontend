// http://unicode-table.com
// export const ENGLISH_PUNCTUATION_RANGES = [[0x21, 0x2F], [0x3A, 0x3F], [0x5B, 0x60], [0x7B, 0x7E]];
// http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml
// export const JAPANESE_FULLWIDTH_PUNCTUATION_RANGES = [[0x3001, 0x303E], [0x30FB, 0x30FC], [0XFF01, 0XFF0F], [0xFF1A, 0xFF1F], [0xFF3B, 0xFF3F], [0xFF5B, 0xFF60]];
export const LOWERCASE_START = 0x61;
export const LOWERCASE_END = 0x7A;
export const UPPERCASE_START = 0x41;
export const UPPERCASE_END = 0x5A;
export const HIRAGANA_START = 0x3041;
export const HIRAGANA_END = 0x3096;
export const KATAKANA_START = 0x30A1;
export const KATAKANA_END = 0x30FC;
export const LOWERCASE_FULLWIDTH_START = 0xFF41;
export const LOWERCASE_FULLWIDTH_END = 0xFF5A;
export const UPPERCASE_FULLWIDTH_START = 0xFF21;
export const UPPERCASE_FULLWIDTH_END = 0xFF3A;
export const PROLONGED_SOUND_MARK = 0x30FC;
export const KANA_SLASH_DOT = 0x30FB;

// All Japanese regex, for mixes of kanji and kana like "泣き虫"
// Includes Japanese full-width punctuation ranges
// doesn't including *half-width katakana / roman letters* since they should be considered typos
export const KANJI_KANA_REGEX = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff01-\uff0f\u4e00-\u9faf\u3400-\u4dbf]/;
