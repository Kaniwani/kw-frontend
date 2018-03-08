import LockButton from 'old/features/LockButton';

export default {
  component: LockButton,

  props: {
    onClick: () => window.alert('clicked!'), // eslint-disable-line no-alert
  },
};
