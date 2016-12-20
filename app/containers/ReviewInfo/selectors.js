import { createSelector } from 'reselect';
import selectSessionDomain, {
  selectCurrentVocab,
} from 'containers/ReviewSession/selectors';

import {
  selectAnswerMatches,
} from 'containers/AnswerInput/selectors';

const selectReviewInfoDomain = () => createSelector(
  selectSessionDomain(),
  (session) => session.get('reviewInfo'),
);

const selectInfoVisible = () => createSelector(
  selectReviewInfoDomain(),
  (substate) => substate.get('infoVisible'),
);

export default selectReviewInfoDomain;
export {
  selectCurrentVocab,
  selectAnswerMatches,
  selectInfoVisible,
};
