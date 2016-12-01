/**
 * Modifies review data loaded from server to preferred js name formats and shape
 * @param  {object} data Review data server result
 * @return {object} Modified review data
 */
export function shapeReviewData(data) { // eslint-disable-line import/prefer-default-export
  const shapedReviews = data.results.map((item) => {
    const shapedItem = {
      id: item.id,
      vocabulary: item.vocabulary,
      // correct: item.correct,
      // incorrect: item.incorrect,
      streak: item.streak,
      previousStreak: item.streak,
      session: {
        correct: 0,
        incorrect: 0,
        ignored: 0,
      },
    };

    return shapedItem;
  });

  return { count: data.count, reviews: shapedReviews };
}

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

/**
 * Checks if answer matches either kana or character strings in answers list
 * @param  {array} answers Array of vocabulary objects to check against
 * @param  {string} input User input to check with
 * @return {boolean} True if a match was found
 */
export function answerMatches(answers, input) {
  return keyInListMatches(answers, 'kana', input) || keyInListMatches(answers, 'character', input);
}

/**
 * For use as immutablejs updateIn() function in reducers
 * Takes a number and adds it to the value on the next invocation
 * Usage: updateIn(['nested', someNum'], (someNum) => add(1)(someNum))
 * or: updateIn(['nested', someNum'], add(1))
 * @param {number} a Number to add to the next value passed in the following invocation
 */
export const add = (b) => (a) => a + b;

/**
* For use as immutablejs updateIn() function in reducers
* Takes a number and subtracts it from the value on the next invocation
* Usage: updateIn(['nested', someNum'], (someNum) => subtract(1)(someNum))
* or: updateIn(['nested', someNum'], subtract(1))
* @param {number} a Number to add to the next value passed in the following invocation
*/
export const subtract = (b) => (a) => a - b;
