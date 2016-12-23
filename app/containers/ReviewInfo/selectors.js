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

const selectInfoToggleBarVisible = () => createSelector(
  selectReviewInfoDomain(),
  (substate) => substate.get('toggleBarVisible'),
);

const selectInfoPanelsVisible = () => createSelector(
  selectReviewInfoDomain(),
  (substate) => substate.get('panelsVisible'),
);

const selectInfoAddSynonymVisible = () => createSelector(
  selectReviewInfoDomain(),
  (substate) => substate.get('newSynonymPanelVisible'),
);

const selectInfoDetailLevel = () => createSelector(
  selectReviewInfoDomain(),
  (substate) => substate.get('detailLevel'),
);

export default selectReviewInfoDomain;
export {
  selectCurrentVocab,
  selectAnswerMatches,
  selectInfoToggleBarVisible,
  selectInfoPanelsVisible,
  selectInfoAddSynonymVisible,
  selectInfoDetailLevel,
};
