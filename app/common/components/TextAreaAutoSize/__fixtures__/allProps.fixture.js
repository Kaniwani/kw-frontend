import TextAreaAutoSize from "common/components/TextAreaAutoSize";

export default {
  component: TextAreaAutoSize,
  withCosmosXRay: false,
  props: {
    input: {
      value: 'This comes automatically from redux-form',
      onChange: () => window.alert('Handled by redux-form'),
    },
  },
};
