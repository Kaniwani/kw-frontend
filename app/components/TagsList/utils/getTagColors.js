import * as COLORS from "shared/styles/colors";

function getTagColors(text) {
  const isCommon = /common/i.test(text);
  const isNoun = /noun/i.test(text);
  const isAdverb = /adverb/i.test(text);
  const isVerb = /\bverb/i.test(text);
  const isAdj = /\badj/i.test(text);

  // TODO: all pale background colors, black text?
  const palette = {
    default: { textColor: COLORS.whiteLight, bgColor: COLORS.grey },
    common: { textColor: COLORS.whiteLight, bgColor: COLORS.blue },
    noun: { textColor: COLORS.whiteLight, bgColor: COLORS.purpleDark },
    adverb: { textColor: COLORS.whiteLight, bgColor: COLORS.pink },
    verb: { textColor: COLORS.blackLight, bgColor: COLORS.teal },
    adj: { textColor: COLORS.blackLight, bgColor: COLORS.yellow },
  };

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
