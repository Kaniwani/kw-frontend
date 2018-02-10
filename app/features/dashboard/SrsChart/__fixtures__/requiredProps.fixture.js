import { SrsChart } from 'features/dashboard/SrsChart';
import formatSrsCounts from 'common/utils/formatSrsCounts';

export default {
  component: SrsChart,
  withCosmosXRay: false,
  props: {
    data: formatSrsCounts({
      UNTRAINED: 12,
      APPRENTICE: 125,
      GURU: 54,
      MASTER: 0,
      ENLIGHTENED: 12,
      BURNED: 24,
    }),
    hasPositiveCount: true,
  },
};
