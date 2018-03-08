import BackgroundImg from 'common/components/BackgroundImg';
BackgroundImg.displayName = 'BackgroundImg';

export default {
  component: BackgroundImg,

  withCosmosWrapper: {
    style: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
    },
  },
  props: {
    imgSrc: 'http://fillmurray.com/1200/1600',
  },
};
