import TextAreaAutoSize from "components/TextAreaAutoSize";

export default {
  component: TextAreaAutoSize,
  props: {
    input: {
      value: 'This comes automatically from redux-form',
      onChange: () => window.alert('Handled by redux-form'),
    },
  },
};
