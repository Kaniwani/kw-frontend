import { StrokeLoader } from 'common/components/KanjiStroke/StrokeLoader';
import KanjiStroke from 'common/components/KanjiStroke/KanjiStroke';

export default {
  component: StrokeLoader,
  withCosmosXRay: false,
  props: {
    ...KanjiStroke.defaultProps,
    word: '魔',
  },
};
