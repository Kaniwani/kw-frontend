import VocabStats from 'old/features/VocabStats';
import { stats } from 'common/data/fixtures/reviews';

export default {
  component: VocabStats,

  url: '/',
  props: stats[0],
};
