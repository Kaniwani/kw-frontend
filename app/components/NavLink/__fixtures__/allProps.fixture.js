import NavLink from "components/NavLink";

export default {
  component: NavLink,
  url: "/",
  props: {
    text: "infinity",
    route: "/infinity",
    ...NavLink.defaultProps,
  },
};
