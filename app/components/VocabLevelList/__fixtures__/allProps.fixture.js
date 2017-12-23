import VocabLevelList from "components/VocabLevelList";

export default {
  component: VocabLevelList,
  url: "/vocabulary",
  props: {
    ...VocabLevelList.defaultProps,
    items: [
      {
        id: 1,
      },
      {
        id: 2,
        title: "Custom title",
        count: 102,
        isActionable: true,
        isLocked: false,
        onLock: () => window.alert('click!')
      },
      {
        id: 3,
        count: 23,
        isActionable: true,
        isLocked: false,
      },
      {
        id: 4,
        isActionable: false,
        isLocked: false,
        isSubmitting: true,
      },
      {
        id: 5,
        isActionable: true,
        isLocked: true,
        count: 256,
      },
      {
        id: 6,
        isActionable: false,
        isLocked: true,
      },
    ],
  },
};
