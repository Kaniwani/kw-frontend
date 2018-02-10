import KanjiStroke from 'common/components/KanjiStroke/KanjiStroke';

export default {
  component: KanjiStroke,
  withCosmosXRay: false,
  props: {
    ...KanjiStroke.defaultProps,
    word: '混乱する',
  },
};
