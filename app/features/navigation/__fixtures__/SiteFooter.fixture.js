import { SiteFooter } from 'features/navigation/SiteFooter';

export default {
  component: SiteFooter,

  url: '/',
  reduxState: {},
  props: {
    onLogout: () => window.alert('logout!'),
  },
};
