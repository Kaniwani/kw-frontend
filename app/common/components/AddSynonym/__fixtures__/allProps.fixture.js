import { AddSynonym, ANSWER_TYPES } from "common/components/AddSynonym";
AddSynonym.displayName = "reduxForm(AddSynonym)";

export default {
  component: AddSynonym,
  withCosmosXRay: false,
  reduxState: {},
  props: {
    form: "addSynonym",
    answerType: ANSWER_TYPES.WORD,
    answerValue: "大人しい",
    initialValues: {
      word: "大人しい",
      reading: "",
    },
    onSubmit: () => window.alert("Submit!"),
  },
};
