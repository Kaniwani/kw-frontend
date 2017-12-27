import ContactPage from "pages/ContactPage";
import mockOnSubmit from 'common/utils/mockOnSubmit';

export default {
  withCosmosXRay: false,
  component: ContactPage,
  url: "/contact",
  reduxState: {},
  props: {
    name: "username",
    email: "dave@dave.com",
    onContactSubmit: mockOnSubmit(),
  },
};
