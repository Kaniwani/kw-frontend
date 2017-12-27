import Reading from "old/features/Reading";

export default {
  component: Reading,
  withCosmosXRay: false,
  props: {
    ...Reading.defaultProps,
  },
};
