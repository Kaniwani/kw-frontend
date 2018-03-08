import { Announcement } from 'features/announcements/Announcement';
import items from 'common/data/fixtures/announcements';
import { sample } from 'lodash';

export default {
  withCosmosWrapper: true,

  component: Announcement,
  props: {
    ...sample(items),
  },
};
