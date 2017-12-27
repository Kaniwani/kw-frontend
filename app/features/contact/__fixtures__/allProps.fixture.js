import { Contact } from "features/contact/Contact";
import mockOnSubmit from 'common/utils/mockOnSubmit';

Contact.displayName = 'reduxForm(Contact)';

export default {
  component: Contact,
  withCosmosXRay: false,
  reduxState: {},
  props: {
    ...Contact.defaultProps,
    form: 'ContactFixture',
    initialValues: {
      name: 'Username',
      email: 'user@email.com',
    },
    onSubmit: mockOnSubmit(),
  },
};
