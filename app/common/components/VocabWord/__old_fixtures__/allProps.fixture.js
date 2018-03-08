import VocabWord from 'old/features/VocabWord';

export default {
  component: VocabWord,

  props: {
    ...VocabWord.defaultProps,
    word: '無駄',
    furi: '0:む;1:だ',
    primaryReading: 'むだ',
    secondaryReadings: ['ちかじか', 'ちかごろ', 'ちかぢか'],
  },
};
