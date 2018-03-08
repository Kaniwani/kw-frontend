import VocabCard from 'components/VocabCard';

export default {
  withCosmosWrapper: true,
  component: VocabCard,

  url: '/',
  props: {
    id: 23467,
    word: '下駄',
    furi: '',
    primaryReading: 'げた',
    primaryMeaning: 'clogs',
    secondaryMeanings: [
      'funny shoes',
      'foot helmets',
      'scuba kickers',
      'big boys',
      'wooden clackers',
    ],
  },
};
