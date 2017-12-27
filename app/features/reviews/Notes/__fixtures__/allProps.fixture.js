import { Notes } from "features/reviews/Notes";
Notes.displayName = 'reduxForm(Notes)';

export default {
  component: Notes,
  withCosmosXRay: false,
  reduxState: {},
  props: {
    form: 'Notes',
    initialValues: {
      notes: "I'm a previously saved note",
    },
    onSubmit: () => window.alert("Submit!"),
  },
};
