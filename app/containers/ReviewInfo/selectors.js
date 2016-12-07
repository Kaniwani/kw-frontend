import { createSelector } from 'reselect';
import {
  selectCurrentVocab,
  selectCurrentReadings,
} from 'containers/Review/selectors';

import {
  selectAnswerValid,
  selectAnswerMarked,
} from 'containers/AnswerInput/selectors';

const selectReviewInfoDomain = () => (state) => state.getIn(['review', 'reviewInfo']);

const selectCharactersVisible = () => createSelector(
  selectReviewInfoDomain(),
  (substate) => substate.get('charactersVisible'),
);

const selectInfoVisible = () => createSelector(
  selectAnswerValid(),
  selectAnswerMarked(),
  (valid, marked) => valid && marked,
);

const selectKanaVisible = () => createSelector(
  selectReviewInfoDomain(),
  (substate) => substate.get('kanaVisible'),
);

const selectCharacters = () => createSelector(
  selectCurrentReadings(),
  (substate) => substate.map((entry) => entry.get('character')).toJS(),
);

const selectKana = () => createSelector(
  selectCurrentReadings(),
  (substate) => substate.map((entry) => entry.get('kana')).toJS(),
);

export default selectReviewInfoDomain;
export {
  selectCurrentVocab,
  selectCharacters,
  selectKana,
  selectInfoVisible,
  selectCharactersVisible,
  selectKanaVisible,
};
