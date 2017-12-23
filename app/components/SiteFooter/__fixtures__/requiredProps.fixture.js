import SiteFooter from "components/SiteFooter";

export default {
  component: SiteFooter,
  url: '/',
  props: {
    onLogout: () => window.alert('logout!'),
  },
};
