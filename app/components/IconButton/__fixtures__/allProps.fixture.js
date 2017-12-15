import IconButton from "components/IconButton";

export default {
  component: IconButton,
  props: {
    name: "ADD",
    title: "Add Me",
    type: "button",
    plainButton: true,
    color: "currentColor",
    size: "1.5em",
    disabled: false,
    inline: false,
    children: null,
    onClick: (event) =>
      event /* passthrough, for submit buttons in forms with onSubmit */,
  },
};
