import { SiteFooter } from 'features/navigation/SiteFooter';

export default {
  component: SiteFooter,
  withCosmosXRay: false,
  url: '/',
  reduxState: {},
  props: {
    onLogout: () => window.alert('logout!'),
  },
};
