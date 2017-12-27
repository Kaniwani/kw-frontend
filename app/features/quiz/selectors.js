import { createSelector } from "reselect";
import { get } from 'lodash';

import {
  getProp,
  getState,
  getVal,
  makeSelectDomain,
} from "common/selectors";

import {
  selectUserProfile,
} from 'features/user/selectors';

export const UI_DOMAIN = "quiz";
export const selectQuizUi = makeSelectDomain(UI_DOMAIN);

// export const selectSessionCount = createSelector(
//   [selectUserProfile, getProp('category')],
//   (profile, category) => get(profile, `${category}Count`)
// );
//
// export const selectCorrectCount = createDeepEqualSelector(
//   selectSession,
//   ({ correct }) => correct.length
// );
//
// export const selectIncorrectCount = createDeepEqualSelector(
//   selectSession,
//   ({ incorrect }) => incorrect.length
// );
//
// export const selectRemainingCount = createDeepEqualSelector(
//   [selectCorrectCount, selectSessionCount],
//   (correct, total) => Math.max(total - correct, 0)
// );

export default selectQuizUi;
