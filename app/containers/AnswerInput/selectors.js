import { createSelector } from 'reselect';
import selectSessionDomain from 'containers/ReviewSession/selectors';

/**
 * Direct selector to the answerInput state domain
 */
const selectAnswerInputDomain = () => createSelector(
  selectSessionDomain(),
  (session) => session.get('answer'),
);

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

const selectAnswerType = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.get('answerType'),
);

const selectAnswerMarked = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.get('marked'),
);

export default selectAnswerInputDomain;

export {
  selectInputText,
  selectInputDisabled,
  selectAnswerMatches,
  selectAnswerMarked,
  selectAnswerValid,
  selectAnswerType,
};
