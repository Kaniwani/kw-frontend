import OffCanvasMenu from 'features/navigation/OffCanvasMenu';

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
      { name: 'onward!', route: '/onward', isOffCanvas: true },
      { name: 'to somewhere!', route: '/somewhere', isOffCanvas: true },
      { name: 'disabled', route: '/somewhere', isOffCanvas: true, disabled: true },
      { name: 'to somewhere else!', route: '/somewhere/else', isOffCanvas: true },
    ],
    isVisible: true,
    onLogout: () => window.alert('logout!'),
    onClose: () => window.alert('close!'),
  },
};
