import { createSelector } from 'reselect';
import selectSessionDomain, {
  selectCurrentVocab,
} from 'containers/ReviewSession/selectors';

import {
  selectAnswerMatches,
} from 'containers/AnswerInput/selectors';

import { getDetailLevelName } from './utils';

const selectReviewInfoDomain = () => createSelector(
  selectSessionDomain(),
  (session) => session.get('reviewInfo'),
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

const selectInfoDetailLevelName = () => createSelector(
  selectInfoDetailLevel(),
  (level) => getDetailLevelName(level),
);

export default selectReviewInfoDomain;
export {
  selectCurrentVocab,
  selectAnswerMatches,
  selectInfoPanelsVisible,
  selectInfoAddSynonymVisible,
  selectInfoDetailLevel,
  selectInfoDetailLevelName,
};
