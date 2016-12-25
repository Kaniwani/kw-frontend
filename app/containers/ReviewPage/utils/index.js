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

export const add = (b) => (a) => a + b;
export const subtract = (b) => (a) => a - b;

/**
 * Helper function to correctly decrement streak value and increase count of incorrect.
 * If user is nearing burned status, they get doubly-decremented.
 * @param  {Number} streak
 * @return {Number} decreased streak or 0 (if decreased streak is negative)
 */
export const getDecreasedStreak = (streak) => {
  const newStreak = streak === 7 ? streak - 2 : streak - 1;
  return Math.max(0, newStreak);
};
