import QuizControls from "old/features/QuizControls";

QuizControls.displayName = "QuizControls"; // otherwise 'styled.div' cosmos

export default {
  component: QuizControls,
  withCosmosXRay: false,
  props: {
    onInfo: () => window.alert('in parent'),
    onWrapUp: () => window.alert('in parent'),
    onAddSynonym: () => window.alert('in parent'),
    disabled: false,
  },
};
