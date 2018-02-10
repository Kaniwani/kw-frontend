import OverlayPortal from 'common/components/OverlayPortal';

export default {
  component: OverlayPortal,
  props: {
    isOpen: true,
  },
  children: ['Hello Overlay'],
};
