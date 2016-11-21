/**
 * Checks an array of objects to see if a particular key's value matches a target
 * @param  {Object[]} list - List of objects to check
 * @param  {string} key - Key in each object to check value against target
 * @param  {any} target Target - value to test for
 * @return {boolean} True if a match was found
 */
export default function keyInListMatches(list, key, target) {
  return list.some((obj) => obj[key] === target);
}
