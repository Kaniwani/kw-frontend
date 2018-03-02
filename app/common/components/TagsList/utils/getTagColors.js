import * as COLORS from 'common/styles/colors';

let palette = {
  default: { bgColor: COLORS.purple[0] },
  noun: { bgColor: COLORS.orange[2] },
  adverb: { bgColor: COLORS.pink[0] },
  verb: { bgColor: COLORS.cyan[4] },
  adj: { bgColor: COLORS.yellow[3] },
};

palette = Object.entries(palette).reduce((hash, [key, { bgColor }]) => {
  hash[key] = { bgColor, textColor: COLORS.black[2] }; // eslint-disable-line
  return hash;
}, {});

function getTagColors(text) {
  const isNoun = /noun/i.test(text);
  const isAdverb = /adverb/i.test(text);
  const isVerb = /\bverb/i.test(text);
  const isAdj = /\badj/i.test(text);

  switch (true) {
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
