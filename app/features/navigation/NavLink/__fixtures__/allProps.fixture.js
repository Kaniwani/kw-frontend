import { NavLink } from 'features/navigation/NavLink/NavLink';

export default {
  component: NavLink,
  withCosmosXRay: false,
  url: '/',
  props: {
    name: 'infinity',
    route: '/infinity',
    ...NavLink.defaultProps,
  },
};
