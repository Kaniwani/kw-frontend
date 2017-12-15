import StripeHeading from "components/StripeHeading";

export default {
  component: StripeHeading,
  props: {
    ...StripeHeading.defaultProps,
    text: "All Stripey",
  },
};
