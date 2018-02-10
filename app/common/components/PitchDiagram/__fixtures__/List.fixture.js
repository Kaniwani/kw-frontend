import { PitchDiagramList } from 'common/components/PitchDiagram/PitchDiagramList';

export default {
  component: PitchDiagramList,
  withCosmosXRay: false,
  props: {
    pitch: [2, 1],
    primaryReading: 'こうこう',
  },
};
