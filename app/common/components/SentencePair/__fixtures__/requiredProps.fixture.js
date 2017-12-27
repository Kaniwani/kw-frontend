import { SentencePair } from "common/components/SentencePair";

export default {
  component: SentencePair,
  withCosmosXRay: false,
  props: {
    word: "土",
    primaryReading: "つち",
    sentenceEn: "Also my bedding got dirt on it.",
    sentenceJa: "寝具も土埃で汚してしまいました",
  },
};
