import { SiteHeader } from 'features/navigation/SiteHeader';

const primaryLinks = [
  {
    text: 'lessons',
    route: '/lessons',
    count: 24,
    disabled: false,
  },
  {
    text: 'reviews',
    route: '/reviews',
    count: 456,
    disabled: false,
  },
];
const secondaryLinks = [
  { text: 'vocabulary', route: '/vocabulary/levels' },
  { text: 'settings', route: '/settings' },
  { text: 'about', route: '/about' },
  { text: 'contact', route: '/contact' },
  { text: 'logout', route: '/logout' },
];

export default {
  component: SiteHeader,

  url: '/',
  reduxState: {},
  props: {
    ...SiteHeader.defaultProps,
    primaryLinks,
    secondaryLinks,
    onLogout: () => window.alert('logout!'),
    onHamburgerToggle: () => window.alert('open menu!'),
    onOffCanvasMenuClose: () => 'close menu!',
  },
};
