import { createSelector } from "reselect";
import { get } from 'lodash';
import {
  getProp,
  makeSelectDomain,
} from "common/selectors";

export const UI_DOMAIN = "level";

const selectVocabLevelUi = makeSelectDomain(UI_DOMAIN);

const shouldLoad = (isLoading, lastLoad) => !lastLoad && !isLoading;

export const selectVocabLevelLastLoad = createSelector(
  [selectVocabLevelUi, getProp('id')],
  (state, id) => get(state, ['lastLoad', id]) || false,
);

export const selectVocabLevelIsLoading = createSelector(
  [selectVocabLevelUi, getProp('id')],
  (state, id) => get(state, 'isLoading').includes(id),
);

export const selectVocabLevelShouldLoad = createSelector(
  [selectVocabLevelIsLoading, selectVocabLevelLastLoad],
  shouldLoad,
);
export const selectVocabLevelError = createSelector(
  [selectVocabLevelUi, getProp('id')],
  (state, id) => get(state, ['error', id]) || false,
);
