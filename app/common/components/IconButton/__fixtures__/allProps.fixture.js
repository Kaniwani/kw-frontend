import IconButton from "common/components/IconButton";

export default {
  component: IconButton,
  withCosmosXRay: false,
  props: {
    name: "ADD",
    title: "Add Me",
    ...IconButton.defaultProps,
  },
};
