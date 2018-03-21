import { createSelector } from 'reselect';
import { VERB_TYPES, ADJ_TYPES } from 'common/utils/conjugate';
import { getState, makeSelectItemIds, makeSelectItemById } from 'common/selectors';

export const ENTITY_DOMAIN = 'vocab';
export const selectVocabDomain = getState(['entities', ENTITY_DOMAIN]);
export const selectVocabIds = makeSelectItemIds(selectVocabDomain);
export const selectVocab = selectVocabDomain;
export const selectVocabById = makeSelectItemById(selectVocab);

export const selectTags = createSelector(selectVocabById, getState('tags', []));
export const selectVerbType = createSelector(selectTags, (tags) =>
  tags.find((tag) => VERB_TYPES.includes(tag))
);
export const selectAdjType = createSelector(selectTags, (tags) =>
  tags.find((tag) => ADJ_TYPES.includes(tag))
);

export const selectPitch = createSelector(selectVocabById, getState('pitch', [-1]));
export const selectWord = createSelector(selectVocabById, getState('word', ''));
export const selectFuri = createSelector(selectVocabById, getState('furi', ''));
export const selectSentenceEn = createSelector(selectVocabById, getState('sentenceEn', ''));
export const selectSentenceJa = createSelector(selectVocabById, getState('sentenceJa', ''));
export const selectPrimaryReading = createSelector(selectVocabById, getState('primaryReading', ''));
export const selectSecondaryReadings = createSelector(
  selectVocabById,
  getState('secondaryReadings', [])
);

export default selectVocabDomain;
