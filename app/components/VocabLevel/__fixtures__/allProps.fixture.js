import VocabLevel from 'components/VocabLevel';

export default {
  component: VocabLevel,
  url: '/vocabulary',
  props: {
    ...VocabLevel.defaultProps,
    id: 2,
  },
};
