import OffCanvasMenu from "features/navigation/OffCanvasMenu";

export default {
  withCosmosWrapper: {
    style: {
      transform: 'translateX(-50%)',
      height: '100vh',
    },
  },
  component: OffCanvasMenu,
  withCosmosXRay: false,
  url: '/',
  props: {
    links: [
      { text: 'onward!', route: '/onward' },
      { text: 'to somewhere!', route: '/somewhere' },
      { text: 'to somewhere else!', route: '/somewhere/else' },
    ],
    isVisible: true,
    onLogout: () => window.alert('logout!'),
    onClose: () => window.alert('close!'),
  },
};
