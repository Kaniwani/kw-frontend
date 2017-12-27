import LockButton from "old/features/LockButton";

export default {
  component: LockButton,
  withCosmosXRay: false,
  props: {
    onClick: () => window.alert("clicked!"), // eslint-disable-line no-alert
  },
};
