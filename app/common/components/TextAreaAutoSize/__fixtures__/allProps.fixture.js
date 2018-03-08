import TextAreaAutoSize from 'common/components/TextAreaAutoSize';

export default {
  component: TextAreaAutoSize,

  reduxState: {},
  props: {
    input: {
      value: 'This comes automatically from redux-form',
      onChange: () => window.alert('Handled by redux-form'),
    },
    meta: {},
  },
};
