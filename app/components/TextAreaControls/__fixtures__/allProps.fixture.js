import TextAreaControls from "components/TextAreaControls";

export default {
  component: TextAreaControls,
  props: {
    maxLength: 50,
    textLength: 24,
    onReset: () => window.alert('Reset parent form!'),
  },
};
