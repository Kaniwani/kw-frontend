import PitchDiagram from "common/components/PitchDiagram/PitchDiagram";

export default {
  component: PitchDiagram,
  withCosmosXRay: false,
  props: {
    reading: "こうこうがっこう",
    pitchNum: 2,
    showMora: true,
    showLabel: true,
    colors: {
      heiban: "#d20ca3",
      odaka: "#0cd24d",
      nakadaka: "#27a2ff",
      atamadaka: "#ea9316",
      unknown: "#cccccc",
    },
  },
};
