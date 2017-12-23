import ContactForm from "components/ContactForm";
ContactForm.displayName = 'ContactForm';

export default {
  component: ContactForm,
  reduxState: {},
  props: {
    ...ContactForm.defaultProps,
    form: 'contactForm',
    initialValues: {
      name: 'Username',
      email: 'user@email.com',
    },
    onSubmit: () => window.alert('Submit!'),
  },
};
