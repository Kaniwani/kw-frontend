import Hamburger from 'features/navigation/Hamburger';

export default {
  component: Hamburger,

  props: {
    ...Hamburger.defaultProps,
    onToggle: () => window.alert('Toggle!'),
  },
};
