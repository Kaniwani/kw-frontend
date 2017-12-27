import VocabLevelPage from 'pages/VocabLevelPage';
import reviews from 'common/data/fixtures/reviews';

export default {
  withCosmosXRay: false,
  component: VocabLevelPage,
  url: '/vocabulary/levels/2',
  props: {
    level: '2',
    notice: "I'm a notice about things like all words being filtered out or level being locked",
    items: reviews.map((r) => ({ ...r, secondaryMeanings: [] })),
  },
};
