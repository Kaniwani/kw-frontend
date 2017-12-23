import SiteHeader from "components/SiteHeader";

export default {
  component: SiteHeader,
  url: '/',
  props: {
    ...SiteHeader.defaultProps,
    onLogout: () => window.alert('logout!'),
    onHamburgerToggle: () => window.alert('toggle!'),
  },
};
