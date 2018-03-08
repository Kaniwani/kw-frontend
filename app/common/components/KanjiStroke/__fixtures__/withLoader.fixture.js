import { StrokeLoader } from 'common/components/KanjiStroke/StrokeLoader';
import KanjiStroke from 'common/components/KanjiStroke/KanjiStroke';

export default {
  component: StrokeLoader,

  props: {
    ...KanjiStroke.defaultProps,
    word: '魔',
  },
};
