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
      // NOTE: don't need these in API response
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
