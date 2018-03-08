import IconButton from 'common/components/IconButton';

export default {
  component: IconButton,

  props: {
    name: 'ADD',
    title: 'Add Me',
    ...IconButton.defaultProps,
  },
};
