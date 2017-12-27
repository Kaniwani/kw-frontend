import Hamburger from "features/navigation/Hamburger";

export default {
  component: Hamburger,
  withCosmosXRay: false,
  props: {
    ...Hamburger.defaultProps,
    onToggle: () => window.alert('Toggle!'),
  },
};
