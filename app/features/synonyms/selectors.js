import {
  makeSelectEntityDomain,
  makeSelectItemIds,
  makeSelectItemById,
} from "common/selectors";

export const ENTITY_DOMAIN = "synonyms";
export const selectSynonymsDomain = makeSelectEntityDomain(ENTITY_DOMAIN);
export const selectSynonymIds = makeSelectItemIds(selectSynonymsDomain);
export const selectSynonyms = selectSynonymsDomain;
export const selectSynonymById = makeSelectItemById(selectSynonyms);

export default selectSynonymsDomain;
