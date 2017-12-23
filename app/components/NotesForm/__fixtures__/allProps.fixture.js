import NotesForm from "components/NotesForm";
NotesForm.displayName = 'NotesForm';

export default {
  component: NotesForm,
  reduxState: {},
  props: {
    form: 'notesForm',
    initialValues: {
      notes: "I'm a previously saved note",
    },
    onSubmit: () => window.alert("Submit!"),
  },
};
