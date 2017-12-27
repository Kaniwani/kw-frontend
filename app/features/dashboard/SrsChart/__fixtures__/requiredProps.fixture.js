import { SrsChart } from "features/dashboard/SrsChart";

export default {
  component: SrsChart,
  withCosmosXRay: false,
  props: {
    data: {
      UNTRAINED: 12,
      APPRENTICE: 125,
      GURU: 54,
      MASTER: 0,
      ENLIGHTENED: 12,
      BURNED: 24,
    },
  },
};
