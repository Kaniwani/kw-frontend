import { AnnouncementList } from 'features/announcements/AnnouncementList';
import items from 'common/data/fixtures/announcements';

const ids = Object.keys(items).map(Number);

export default {
  withCosmosWrapper: true,

  component: AnnouncementList,
  reduxState: {
    entities: {
      announcements: items,
    },
  },
  props: {
    ids,
  },
};
