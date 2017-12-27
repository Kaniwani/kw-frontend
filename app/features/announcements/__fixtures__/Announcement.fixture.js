import { Announcement } from 'features/announcements/Announcement';
import items from 'common/data/fixtures/announcements';

export default {
  withCosmosWrapper: true,
  withCosmosXRay: false,
  component: Announcement,
  props: {
    ...items[0],
  },
};
