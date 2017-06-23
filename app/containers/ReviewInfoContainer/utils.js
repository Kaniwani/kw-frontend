/**
 * Cycles review info detail level
 * @param  {String} [detailLevel=''] level of detail to show
 * @return {String} new detail level
 */
export function cycleDetailLevel(detailLevel = '') {
  if (detailLevel === 'LOW') return 'MEDIUM';
  if (detailLevel === 'MEDIUM') return 'HIGH';
  return 'LOW';
}
