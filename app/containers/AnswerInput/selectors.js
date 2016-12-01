import { createSelector } from 'reselect';

/**
 * Direct selector to the answerInput state domain
 */
const selectAnswerInputDomain = () => (state) => state.getIn(['review', 'answer']);

/**
 * Other specific selectors
 */

const selectInputText = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.get('inputText'),
);

const selectInputDisabled = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.get('inputDisabled'),
);

const selectAnswerMatches = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.get('matches'),
);

const selectAnswerValid = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.get('valid'),
);

const selectAnswerMarked = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.get('marked'),
);

/**
 * Default selector used by AnswerInput
 */

const selectAnswerInput = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.toJS(),
);

export default selectAnswerInput;
export {
  selectInputText,
  selectInputDisabled,
  selectAnswerMatches,
  selectAnswerMarked,
  selectAnswerValid,
};
