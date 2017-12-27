import TagsList from "old/features/TagsList";

export default {
  component: TagsList,
  withCosmosXRay: false,
  props: {
    tags: ["common", "v5"],
    isHidden: false,
  },
};
