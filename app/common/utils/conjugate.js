// NOTE: adapted from elsewhere, haven't really cleaned up the code (style) yet

const conjugationForms = [
  {
    name: 'plain affirmative',
    forms: ['う', 'く', 'ぐ', 'す', 'つ', 'む', 'ぶ', 'ぬ', 'る', 'る'],
  },

  // present tense: 0-5
  {
    name: 'polite affirmative',
    forms: [
      'います',
      'きます',
      'ぎます',
      'します',
      'ちます',
      'みます',
      'びます',
      'にます',
      'ります',
      'ます',
    ],
  },
  {
    name: 'plain negative',
    forms: [
      'わない',
      'かない',
      'がない',
      'さない',
      'たない',
      'まない',
      'ばない',
      'なない',
      'らない',
      'ない',
    ],
  },
  {
    name: 'polite negative',
    forms: [
      'いません',
      'きません',
      'ぎません',
      'しません',
      'ちません',
      'みません',
      'びません',
      'にません',
      'りません',
      'ません',
    ],
  },
  {
    name: 'curt negative (archaic)',
    forms: ['わん', 'かん', 'がん', 'さん', 'たん', 'まん', 'ばん', 'なん', 'らん', 'ん'],
  },
  {
    name: 'polite negative (archaic)',
    forms: [
      'いませぬ',
      'きませぬ',
      'ぎませぬ',
      'しませぬ',
      'ちませぬ',
      'みませぬ',
      'びませぬ',
      'にませぬ',
      'りませぬ',
      'ませぬ',
    ],
  },

  // past tense: 6-9
  {
    name: 'past tense',
    forms: ['った', 'いた', 'いだ', 'した', 'った', 'んだ', 'んだ', 'んだ', 'った', 'た'],
  },
  {
    name: 'polite affirmative',
    forms: [
      'いました',
      'きました',
      'ぎました',
      'しました',
      'ちました',
      'みました',
      'びました',
      'にました',
      'りました',
      'ました',
    ],
  },
  {
    name: 'plain negative',
    forms: [
      'わなかった',
      'かなかった',
      'がなかった',
      'さなかった',
      'たなかった',
      'まなかった',
      'ばなかった',
      'ななかった',
      'らなかった',
      'なかった',
    ],
  },
  {
    name: 'polite negative',
    forms: [
      'いませんでした',
      'きませんでした',
      'ぎませんでした',
      'しませんでした',
      'ちませんでした',
      'みませんでした',
      'びませんでした',
      'にませんでした',
      'りませんでした',
      'ませんでした',
    ],
  },

  // perfect: 10
  {
    name: 'negative perfect',
    forms: ['わず', 'かず', 'がず', 'さず', 'たず', 'まず', 'ばず', 'なず', 'らず', 'ず'],
  },

  // ta form: 11
  {
    name: 'representative',
    forms: [
      'ったり',
      'いたり',
      'いだり',
      'したり',
      'ったり',
      'んだり',
      'んだり',
      'んだり',
      'ったり',
      'たり',
    ],
  },

  // renyoukei: 12-13
  {
    name: 'conjunctive',
    forms: ['い-', 'き-', 'ぎ-', 'し-', 'ち-', 'み-', 'び-', 'に-', 'り-', '-'],
  },
  {
    name: 'way of doing',
    forms: [
      'いかた',
      'きかた',
      'ぎかた',
      'しかた',
      'ちかた',
      'みかた',
      'びかた',
      'にかた',
      'りかた',
      'かた',
    ],
  },

  // te forms: 14-22
  {
    name: 'te form',
    forms: ['って', 'いて', 'いで', 'して', 'って', 'んで', 'んで', 'んで', 'って', 'て'],
  },
  {
    name: 'te iru',
    forms: [
      'っている',
      'いている',
      'いでいる',
      'している',
      'っている',
      'んでいる',
      'んでいる',
      'んでいる',
      'っている',
      'ている',
    ],
  },
  {
    name: 'past te iru',
    forms: [
      'っていた',
      'いていた',
      'いでいた',
      'していた',
      'っていた',
      'んでいた',
      'んでいた',
      'んでいた',
      'っていた',
      'ていた',
    ],
  },
  {
    name: 'simplified te iru',
    forms: [
      'ってる',
      'いてる',
      'いでる',
      'してる',
      'ってる',
      'んでる',
      'んでる',
      'んでる',
      'ってる',
      'てる',
    ],
  },
  {
    name: 'te aru',
    forms: [
      'ってある',
      'いてある',
      'いである',
      'してある',
      'ってある',
      'んである',
      'んである',
      'んである',
      'ってある',
      'てある',
    ],
  },
  {
    name: 'simplified te ageru',
    forms: [
      'ったげる',
      'いたげる',
      'いだげる',
      'したげる',
      'ったげる',
      'んだげる',
      'んだげる',
      'んだげる',
      'ったげる',
      'たげる',
    ],
  },
  {
    name: 'te oru',
    forms: [
      'っておる',
      'いておる',
      'いでおる',
      'しておる',
      'っておる',
      'んでおる',
      'んでおる',
      'んでおる',
      'っておる',
      'ておる',
    ],
  },
  {
    name: 'simplified te oru',
    forms: [
      'っとる',
      'いとる',
      'いどる',
      'しとる',
      'っとる',
      'んどる',
      'んどる',
      'んどる',
      'っとる',
      'とる',
    ],
  },
  {
    name: 'te oku',
    forms: [
      'っておく',
      'いておく',
      'いでおく',
      'しておく',
      'っておく',
      'んでおく',
      'んでおく',
      'んでおく',
      'っておく',
      'ておく',
    ],
  },
  {
    name: 'simplified te oku',
    forms: [
      'っとく',
      'いとく',
      'いどく',
      'しとく',
      'っとく',
      'んどく',
      'んどく',
      'んどく',
      'っとく',
      'とく',
    ],
  },

  // tai/tageru: 23-24
  {
    name: 'desire',
    forms: [
      'いたい',
      'きたい',
      'ぎたい',
      'したい',
      'ちたい',
      'みたい',
      'びたい',
      'にたい',
      'りたい',
      'たい',
    ],
  },
  {
    name: "other's desire",
    forms: [
      'いたがる',
      'きたがる',
      'ぎたがる',
      'したがる',
      'ちたがる',
      'みたがる',
      'びたがる',
      'にたがる',
      'りたがる',
      'たがる',
    ],
  },

  // pseudo-futurum forms: 25-30
  {
    name: 'pseudo futurum',
    forms: ['おう', 'こう', 'ごう', 'そう', 'とう', 'もう', 'ぼう', 'のう', 'ろう', 'よう'],
  },
  {
    name: 'polite presumptive',
    forms: [
      'うでしょう',
      'くでしょう',
      'ぐでしょう',
      'すでしょう',
      'つでしょう',
      'むでしょう',
      'ぶでしょう',
      'ぬでしょう',
      'るでしょう',
      'るでしょう',
    ],
  },
  {
    name: 'plain presumptive',
    forms: [
      'うだろう',
      'くだろう',
      'ぐだろう',
      'すだろう',
      'つだろう',
      'むだろう',
      'ぶだろう',
      'ぬだろう',
      'るだろう',
      'るだろう',
    ],
  },
  {
    name: 'polite negative presumptive',
    forms: [
      'わないだろう',
      'かないだろう',
      'がないだろう',
      'さないだろう',
      'たないだろう',
      'まないだろう',
      'ばないだろう',
      'なないだろう',
      'らないだろう',
      'ないだろう',
    ],
  },
  {
    name: 'plain negative presumptive',
    forms: [
      'うまい',
      'くまい',
      'ぐまい',
      'すまい',
      'つまい',
      'むまい',
      'ぶまい',
      'ぬまい',
      'るまい',
      'まい',
    ],
  },
  {
    name: 'past presumptive',
    forms: [
      'ったろう',
      'いたろう',
      'いだろう',
      'したろう',
      'ったろう',
      'んだろう',
      'んだろう',
      'んだろう',
      'った',
      'たろう',
    ],
  },

  // izenkei / kateikei: 31-32
  {
    name: 'hypothetical',
    forms: ['えば', 'けば', 'げば', 'せば', 'てば', 'めば', 'べば', 'ねば', 'れば', 'れば'],
  },
  {
    name: 'past hypothetical',
    forms: [
      'ったら',
      'いたら',
      'いだら',
      'したら',
      'ったら',
      'んだら',
      'んだら',
      'んだら',
      'ったら',
      'たら',
    ],
  },
  {
    name: 'short potential',
    forms: ['える', 'ける', 'げる', 'せる', 'てる', 'める', 'べる', 'ねる', 'れる', ''],
  },

  // saserareru: 33-35
  {
    name: 'passive',
    forms: [
      'われる',
      'かれる',
      'がれる',
      'される',
      'たれる',
      'まれる',
      'ばれる',
      'なれる',
      'られる',
      'られる',
    ],
  },
  {
    name: 'causative',
    forms: [
      'わせる',
      'かせる',
      'がせる',
      'させる',
      'たせる',
      'ませる',
      'ばせる',
      'なせる',
      'らせる',
      'させる',
    ],
  },
  {
    name: 'causative passive',
    forms: [
      'わせられる',
      'かせられる',
      'がせられる',
      'させられる',
      'たせられる',
      'ませられる',
      'ばせられる',
      'なせられる',
      'らせられる',
      'させられる',
    ],
  },

  // commands: 36-41
  {
    name: 'requesting',
    forms: [
      'ってください',
      'いてください',
      'いでください',
      'してください',
      'ってください',
      'んでください',
      'んでください',
      'んでください',
      'ってください',
      'てください',
    ],
  },

  { name: 'commanding', forms: ['え', 'け', 'げ', 'せ', 'て', 'め', 'べ', 'ね', 'れ', 'ろ'] },
  {
    name: 'authoritative',
    forms: [
      'いなさい',
      'きなさい',
      'ぎなさい',
      'しなさい',
      'ちなさい',
      'みなさい',
      'びなさい',
      'になさい',
      'りなさい',
      'なさい',
    ],
  },
  { name: 'advisory', forms: ['', '', '', '', '', '', '', '', '', 'よ'] },
  {
    name: 'negative request',
    forms: [
      'わないでください',
      'かないでください',
      'がないでください',
      'さないでください',
      'たないでください',
      'まないでください',
      'ばないでください',
      'なないでください',
      'らないでください',
      'ないでください',
    ],
  },
  {
    name: 'negative imperative',
    forms: ['うな', 'くな', 'ぐな', 'すな', 'つな', 'むな', 'ぶな', 'ぬな', 'るな', 'るな'],
  },

  // belief about [...]ness: 42-44
  {
    name: 'looks to be the case',
    forms: [
      'いそう',
      'きそう',
      'ぎそう',
      'しそう',
      'ちそう',
      'みそう',
      'びそう',
      'にそう',
      'りそう',
      'そう',
    ],
  },
  {
    name: 'claimed to be the case',
    forms: [
      'うそう',
      'くそう',
      'ぐそう',
      'すそう',
      'つそう',
      'むそう',
      'ぶそう',
      'ぬそう',
      'るそう',
      'るそう',
    ],
  },
  {
    name: 'apparently the case',
    forms: [
      'うらしい',
      'くらしい',
      'ぐらしい',
      'すらしい',
      'つらしい',
      'むらしい',
      'ぶらしい',
      'ぬらしい',
      'るらしい',
      'るらしい',
    ],
  },
];

conjugationForms.sort((a, b) => b.forms[0].length - a.forms[0].length);

export const VERB_TYPES = ['v5u', 'v5k', 'v5g', 'v5s', 'v5t', 'v5m', 'v5b', 'v5n', 'v5r', 'v1'];
const VERB_ENDINGS = ['う', 'く', 'ぐ', 'す', 'つ', 'む', 'ぶ', 'ぬ', 'る', 'る'];

// mutates aggregated
function process(word, seen, aggregated, entry, i, suffix, j) {
  if (!suffix.trim()) return;
  const re = new RegExp(`${suffix}$`);
  let newword;
  if (word.match(re)) {
    newword = word.replace(re, VERB_ENDINGS[j]);
    // special check for する
    if (newword === 'す') {
      newword = 'する';
    }
    // terminal check for orphan v1
    if (newword === 'る') {
      return;
    }
    aggregated.push(
      destep(
        newword,
        seen.concat({
          word: newword,
          found: entry.name,
          verbType: VERB_TYPES[j],
        })
      )
    );
  }
}

function destep(word, seen = []) {
  const aggregated = [];
  conjugationForms.forEach((entry, i) => {
    entry.forms.forEach((suffix, j) => {
      // mutates aggregated
      process(word, seen, aggregated, entry, i, suffix, j);
    });
  });
  return !aggregated.length ? seen.slice() : aggregated;
}

export const deinflect = (word) => destep(word);

export function inflect(verb = '', type = 'v5') {
  let index = [];
  let verbstem = [];
  const ret = [];
  if (type.toLowerCase().indexOf('v1') > -1) {
    index = VERB_TYPES.indexOf('v1');
    verbstem = verb.substring(0, verb.length - 1);
  } else {
    const lastchar = verb.substring(verb.length - 1, verb.length);
    index = VERB_ENDINGS.indexOf(lastchar);
    verbstem = verb.substring(0, verb.length - 1);
  }
  let form;
  let specific;
  for (let i = 0; i < conjugationForms.length; i++) {
    form = conjugationForms[i];
    specific = form.forms[index];
    if (specific !== false) {
      ret.push({ name: form.name, form: verbstem + specific });
    }
  }
  return ret;
}

export default inflect;
