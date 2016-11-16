// TODO: add tests

import { SRS_RANKS } from 'shared/constants';

/**
 * Returns type of provided value with normalized strings.
 * IE 'array' instead of '[object Array]' for [].
 *
 * @param  {} value
 * @return {String} type (number, nan, object, array, map, regexp, date, function etc)
 */
export function typeOf(value) {
  switch (true) {
    case (Number.isNaN(value)): return 'nan';
    case (value === null): return 'null';
    case (value !== Object(value)): return typeof value;
    default: return ({}).toString.call(value).slice(8, -1).toLowerCase();
  }
}

/**
 * Checks values against test types and console.warns any failures
 *
 * @param  {...Array} tests Value/Test pairs of format [value, 'type']
 * @return {Boolean} True if any invalid types
 */
export function warnInvalidParams(...tests) {
  const warnings = tests.reduce((failedList, testPair) => {
    const [value, testType] = testPair;
    const valType = typeOf(value);

    return (valType !== testType) ?
       failedList.concat(`  ${value}: of type ${valType} which should have been ${testType}`) :
       failedList;
  }, []);

  if (warnings.length) {
    console.warn(`Invalid params provided to ${warnInvalidParams.caller.name}:\n${warnings.join('\n')}`);
  }

  return !!warnings.length;
}

/**
 * Calculate percentage
 *
 * @param  {Number} numerator Partial
 * @param  {Number} denominator Total
 * @return {Number} Percentage
 */
export function calculatePercentage(numerator, denominator) {
  warnInvalidParams([numerator, 'number'], [denominator, 'number']);

  // "|| 0" to guard against dividing 0 by 0 => NaN
  return Math.floor((numerator / denominator) * 100) || 0;
}

/**
 * Returns name of srs rank from provided number
 *
 * @param  {Number} streak Current srs rank
 * @return {String} Rank name
 */
export function getSrsRankName(streak) {
  warnInvalidParams([streak, 'number']);

  switch (true) {
    case (streak > 8): return SRS_RANKS.FIVE;
    case (streak > 7): return SRS_RANKS.FOUR;
    case (streak > 6): return SRS_RANKS.THREE;
    case (streak > 4): return SRS_RANKS.TWO;
    default: return SRS_RANKS.ONE;
  }
}
