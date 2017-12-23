import Hamburger from "components/Hamburger";

export default {
  component: Hamburger,
  props: {
    ...Hamburger.defaultProps,
    onToggle: () => window.alert('Toggle!'),
  },
};
