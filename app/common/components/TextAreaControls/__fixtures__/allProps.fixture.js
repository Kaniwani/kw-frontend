import TextAreaControls from "common/components/TextAreaControls";

export default {
  component: TextAreaControls,
  withCosmosXRay: false,
  props: {
    maxLength: 50,
    textLength: 24,
    onReset: () => window.alert('Reset parent form!'),
  },
};
