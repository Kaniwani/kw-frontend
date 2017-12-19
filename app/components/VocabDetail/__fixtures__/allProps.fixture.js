import VocabDetail from 'components/VocabDetail';

export default {
  component: VocabDetail,
  props: {
    ...VocabDetail.defaultProps,
    synonyms: [
      {
        id: 21341,
        word: "感慨無量",
        primaryReading: "かんがいむりょう",
      },
    ],
    words: [
      {
        id: 12346,
        word: "無駄",
        furi: "0:む;1:だ",
        primaryMeaning: "no good",
        primaryReading: "むだ",
        secondaryReadings: ["ちかじか", "ちかごろ", "ちかぢか"],
        secondaryMeanings: ["no, no good for me"],
        level: 7,
        tags: ['common', 'adv', 'v5'],
        sentenceJa: '今度の夏祭りには、浴衣着て下駄履いて行こう',
        sentenceEn: 'I\'m going to put on a yukata and geta when I go to this year\'s summer festival.',
        pitch: [0],
        correct: 2,
        incorrect: 3,
      },
      {
        id: 123124,
        word: "下駄",
        furi: "0:げ;1:た",
        primaryMeaning: "clog",
        primaryReading: "げた",
        secondaryMeanings: ["big ol shoes"],
        level: 2,
        tags: ['vt'],
        sentenceJa: '今度の夏祭りには、浴衣着て下駄履いて行こう',
        sentenceEn: 'I\'m going to put on a yukata and geta when I go to this year\'s summer festival.',
        pitch: [0, 1],
        correct: 4,
        incorrect: 2,
      },
    ],
  },
};
