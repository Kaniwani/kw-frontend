import VocabList, { ITEM_TYPES } from 'old/features/VocabList';
import reviews from 'common/data/fixtures/reviews';

export default {
  component: VocabList,

  url: '/',
  props: {
    itemType: ITEM_TYPES.CARD,
    items: reviews,
  },
};
