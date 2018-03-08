import PercentageBar from 'old/features/PercentageBar';

export default {
  component: PercentageBar,

  props: {
    count: 9.5,
    total: 10,
    renderLabel: ({ count, total, percent }) =>
      `Custom renderLabel provides { count: ${count}, total: ${total}, percent: ${percent} }`,
  },
};
