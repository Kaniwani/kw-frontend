import NavLink from "components/NavLink";

export default {
  component: NavLink,
  url: "/",
  props: {
    text: "Infinity",
    route: "/infinity",
    ...NavLink.defaultProps,
  },
};
