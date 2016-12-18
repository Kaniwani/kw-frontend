import { createSelector } from 'reselect';
import selectSessionDomain, {
  selectCurrentVocab,
  selectCurrentReadings,
} from 'containers/ReviewSession/selectors';

import {
  selectAnswerValid,
  selectAnswerMarked,
  selectAnswerMatches,
} from 'containers/AnswerInput/selectors';

const selectReviewInfoDomain = () => createSelector(
  selectSessionDomain(),
  (session) => session.get('reviewInfo'),
);

const selectCharactersVisible = () => createSelector(
  selectReviewInfoDomain(),
  (substate) => substate.get('charactersVisible'),
);

const selectKanaVisible = () => createSelector(
  selectReviewInfoDomain(),
  (substate) => substate.get('kanaVisible'),
);

const selectInfoVisible = () => createSelector(
  selectAnswerMarked(),
  selectAnswerValid(),
  (marked, valid) => marked && valid,
);

const selectCharacters = () => createSelector(
  selectCurrentReadings(),
  (substate) => substate.map((entry) => entry.get('character')),
);

const selectKana = () => createSelector(
  selectCurrentReadings(),
  (substate) => substate.map((entry) => entry.get('kana')),
);

export default selectReviewInfoDomain;
export {
  selectCurrentVocab,
  selectCharacters,
  selectKana,
  selectAnswerMatches,
  selectInfoVisible,
  selectKanaVisible,
  selectCharactersVisible,
};
