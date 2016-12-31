
/**
 * Add review count to review route in first index
 * Apologies for dodginess
 * @param {Immutable List} list of routes as Maps
 * @param {Number} count
 * @return {Immutable List} new list with count added
 */
export function addReviewCount(list, count) { // eslint-disable-line import/prefer-default-export
  return list.setIn([0, 'count'], count);
}
