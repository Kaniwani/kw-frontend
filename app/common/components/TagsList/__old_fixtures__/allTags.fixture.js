import TagsList from "old/features/TagsList";
import { TAGS } from "common/constants";

export default {
  component: TagsList,
  withCosmosXRay: false,
  props: {
    tags: Object.keys(TAGS),
    isHidden: false,
  },
};
