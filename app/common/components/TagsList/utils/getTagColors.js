import * as COLORS from 'common/styles/colors';
import { readableColor } from 'polished';

let palette = {
  default: { bgColor: COLORS.grey[7] },
  common: { bgColor: COLORS.blue[3] },
  noun: { bgColor: COLORS.purple[3] },
  adverb: { bgColor: COLORS.pink[3] },
  verb: { bgColor: COLORS.teal[3] },
  adj: { bgColor: COLORS.yellow[3] },
};

palette = Object.entries(palette).reduce((hash, [key, { bgColor }]) => {
  hash[key] = { bgColor, textColor: readableColor(bgColor) }; // eslint-disable-line
  return hash;
}, {});

function getTagColors(text) {
  const isCommon = /common/i.test(text);
  const isNoun = /noun/i.test(text);
  const isAdverb = /adverb/i.test(text);
  const isVerb = /\bverb/i.test(text);
  const isAdj = /\badj/i.test(text);

  switch (true) {
    case isCommon:
      return palette.common;
    case isNoun:
      return palette.noun;
    case isAdverb:
      return palette.adverb;
    case isVerb:
      return palette.verb;
    case isAdj:
      return palette.adj;
    default:
      return palette.default;
  }
}

export default getTagColors;
