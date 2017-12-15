import TagsList from "components/TagsList";
import { TAGS } from "shared/constants";

export default {
  component: TagsList,
  props: {
    tags: Object.keys(TAGS),
    isHidden: false,
  },
};
