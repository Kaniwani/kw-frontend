import { Announcements } from "features/announcements/Announcements";
import items from "common/data/fixtures/announcements";

const ids = Object.keys(items).map(Number);

export default {
  withCosmosWrapper: true,
  withCosmosXRay: false,
  component: Announcements,
  reduxState: {
    announcements: items,
  },
  props: {
    ids,
  },
};
