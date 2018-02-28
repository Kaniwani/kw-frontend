import { createSelector } from 'reselect';
import { getState, makeSelectItemIds, makeSelectItemById } from 'common/selectors';

export const UI_DOMAIN = 'synonyms';
export const ENTITY_DOMAIN = 'synonyms';
export const selectSynonymsUiDomain = getState(UI_DOMAIN, {});
export const selectSynonymsDomain = getState(['entities', ENTITY_DOMAIN], {});

export const selectSynonymsSubmitting = createSelector(
  selectSynonymsUiDomain,
  getState('submitting', false)
);

export const selectSynonymIds = makeSelectItemIds(selectSynonymsDomain);
export const selectSynonyms = selectSynonymsDomain;
export const selectSynonymById = makeSelectItemById(selectSynonyms);

export default selectSynonymsDomain;
